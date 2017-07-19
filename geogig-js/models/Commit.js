class Commit {
    static new(comment){
        return Utils.geogig(['commit', '-m', comment], this.name)
                .then(response  => { return response})
                .catch(error => { return error});
    }
    static diffCommit(toCompare, thisCommit){
        return new Promise((resolve, reject) => {
            request(`${this.serverAddress}/diff.json?oldRefSpec=${thisCommit}&newRefSpec=${toCompare}&showGeometryChanges=true`,
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}
            )
        })
    }
    static diffFeature(feature, thisCommit, toCompare){
        return new Promise((resolve, reject) => {
            request(`${this.serverAddress}/featurediff.json?path=${feature}&newTreeish=${thisCommit}&oldTreeish=${toCompare}`,
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}
            )
        })
    }

}
POST /repos/<repo>/import[.xml|.json]?format=gpkg
&transactionId=<transactionId>
[&root=<refspec>]
[&layer=<layerName>]
[&interchange=<true|false>]
[&add=<true|false>]
[&alter=<true|false>]
[&forceFeatureType=<true|false>]
[&dest=<destPath>]
[&fidAttribute=<fidAttribute>]
[&authorName=<name>]
[&authorEmail=<email>]
[&message=<message>]
