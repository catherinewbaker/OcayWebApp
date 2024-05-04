# OCAY

## Deploying Traefik Configuration


``` bash
az storage file upload \
  --account-name ocaystorageaccount \
  --share-name traefik-config \
  --source ./traefik.yaml \
  --path traefik.yaml
```
