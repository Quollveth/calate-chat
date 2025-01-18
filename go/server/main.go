package calate

import (
	"fmt"
	"net/http"
)

// this is the real main function
func StartServer() {
	dir := "./generated"
	port := "8080"

	fileServer := http.FileServer(http.Dir(dir))

	http.Handle("/", http.StripPrefix("/", fileServer))

	fmt.Printf("Serving static files from %s on http://localhost:%s\n", dir, port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		panic(err)
	}
}
