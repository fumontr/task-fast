FROM golang:1.18.4 as builder
WORKDIR /workspace
COPY . .
RUN go build -o main main.go
RUN chmod +x main

FROM gcr.io/distroless/base-debian11
COPY --from=builder /workspace/main /
CMD ["./main"]