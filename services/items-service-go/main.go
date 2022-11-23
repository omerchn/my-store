package main

import (
	"fmt"
	items "items-service/out"
)

func main() {
	fmt.Println("Started")
}

type itemsServer struct {
	items.ItemsServer
}

var Server struct {
}

func (s *itemsServer) StreamAll(*items.Empty, items.Items_StreamAllServer) {
}
