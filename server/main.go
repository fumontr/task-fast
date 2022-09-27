package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"net/http"
	"os"
)

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		log.Info("[GET] /")
		return c.JSON(http.StatusOK, "Hello World!")
	})

	e.GET("/health", func(c echo.Context) error {
		log.Info("[GET] /health")
		return c.JSON(http.StatusOK, "Server OK")
	})

	startString := ":8080"
	env := os.Getenv("Env")
	if env == "development" {
		startString = "127.0.0.1" + startString
	}

	e.Logger.Fatal(e.Start(startString))
}
