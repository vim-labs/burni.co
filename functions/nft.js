exports.handler = (e, ctx, cb) => {
  const tokenMetadata = {
    name: "Burnin token",
    description: "A proof-of-burn based NFT.",
    image: "https://burni.co/logo512.png",
    external_url: "https://burnin.co"
  };

  // Add IPFS Gateway if token is passed
  const pathPrefix = "/nft/";
  const multihash = e.path.slice(pathPrefix.length);
  if (e.path.length > pathPrefix.length) {
    tokenMetadata["name"] = `Burnin: ${multihash}`;
    tokenMetadata["external_url"] = `https://ipfs.io/ipfs/${multihash}`;
  }

  cb(null, {
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(tokenMetadata)
  });
};
