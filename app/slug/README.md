# Slug Service

Slug service 🚀

## Requirenments

- node > 11.0

## File structure

The magic is there:

- `app`: Starting point for magic

## Installation

To run the app, run these command in terminal windows from the root of the project:

### Development

```bash
cd app
cp .env.development .env
npm i
npm run dev
```

### Production

```bash
cd app
npm i

npm run-script build
npm start
```

### Make Migration

```bash
cd app
npm run typeorm migration:generate -- -n migrationNameHere
```
