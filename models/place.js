class place {
    constructor(title, imageUri, address, location, id) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location; // {lat: 0.142241, lng: 127.121}
        this.id = new Date().toString() + Math.random().toString();
    }
}