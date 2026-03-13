# homepage

Container-first Setup für eine einfache Homepage (später leicht zur WebApp erweiterbar).

## Lokal entwickeln (nur via Container)

```bash
docker compose up --build
```

Dann `http://localhost:5173`.

## Production Build (Container)

```bash
docker build -t homepage:local .
docker run --rm -p 8080:80 homepage:local
```

Dann `http://localhost:8080`.

