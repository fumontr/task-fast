package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"log"
)

func initLogger() *zap.SugaredLogger {
	level := zap.NewAtomicLevel()
	level.SetLevel(zapcore.DebugLevel)

	// ログの出力形式 json or console
	// json → {"Level":"INFO","Time":"2021-01-13T11:13:24.751Z","Caller":"server/server.go:56","Msg":"set up db conection to mysql done!"}
	// console →  2021-01-13T11:14:38.248Z   INFO    server/server.go:56     set up db conection to mysql done!
	encoding := "console"

	config := zap.Config{
		Level:    level,
		Encoding: encoding,
		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:        "Time",
			LevelKey:       "Level",
			NameKey:        "Name",
			CallerKey:      "Caller",
			FunctionKey:    "Func",
			MessageKey:     "Msg",
			StacktraceKey:  "St",
			EncodeLevel:    zapcore.CapitalColorLevelEncoder,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.StringDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
		OutputPaths:      []string{"stdout"},
		ErrorOutputPaths: []string{"stderr"},
	}

	logger, err := config.Build()
	if err != nil {
		log.Fatalf("Init logger error: %v", err)
	}

	return logger.Sugar()
}
