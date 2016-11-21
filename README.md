# figure-sdk-js
Client-side javascript SDK for Figure API

## Including Figure SDK

```
<script type="text/javascript" src="https://s3-eu-west-1.amazonaws.com/figure-sdk-js/figure-sdk-js.min.js"></script>
```

## Make some requests 


```
/** List last two public portraits **/ 
figure.portraits.getAllPublic({ query: { last: 2 } }, function(err, res) {
  console.log(res.data)
})


/** Get the portrait associated to code `9D646` **/ 
figure.portraits.get("9D646", function(err, portrait) {
  console.log(portrait)
})


/** Publish the portrait associated to code `9D646` **/
figure.portraits.edit("9D646", { data: { public: true } },function(err, portrait) {
  console.log(portrait)
})
```

## Documentation
Full documentation is available at [https://figuredevices.com/docs/api](https://figuredevices.com/docs/api)

## Support
Join our gitter room [https://gitter.im/figuredevices](https://gitter.im/figuredevices) 
