# PeerTube plugin Armanet Integration

## Build plugin source
```npm run build```

## Connect to a Peertube instance
```peertube-cli auth add -u 'PEERTUBE_URL' -U 'PEERTUBE_USER' --password 'PEERTUBE_PASSWORD'```

Local example:

```peertube-cli auth add -u 'http://localhost:3000/' -U 'root' --password 'test'```

## Install the plugin in the Peertube instance (should be done only once)
```peertube-cli plugins install --path /absolute/path/to/peertube-plugin-armanet-integration```


## Update Plugin before each build update
```peertube-cli plugins update --path /absolute/path/to/peertube-plugin-armanet-integration```
