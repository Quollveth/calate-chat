# Stage 1 - Nuxt
FROM node:23 AS nuxt_build

ENV IS_DOCKER=1

WORKDIR /nuxt

COPY ./nuxt/package.json ./
RUN npm install

# Copy and build nuxt
COPY ./nuxt ./ 
RUN npm run generate

# Stage 2 - Go
FROM golang:1.23 AS go_build

WORKDIR /app

COPY ./go/go.mod ./
RUN go mod download
RUN go mod tidy

# Copy and build go
COPY ./go ./ 
# alpine does not have glibc, so we must statically link
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/bin/app

# Final Stage
FROM alpine:3.17
ENV IS_DOCKER=1

WORKDIR /app/

# Copy the previous builds
# The server expects a 'generated' dir in the same root as the binary
COPY --from=go_build /app/bin/app ./
COPY --from=nuxt_build /nuxt/.output/ ./generated

EXPOSE 8080

ENTRYPOINT ["./app"]
