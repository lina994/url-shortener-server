class ShortenController {
  async getLongUrl(req, res) {
    res.send('getLongUrl')
  }
  
  
  async shortenLink(req, res) {
    res.send('shortenLink')
  }
}


export default new ShortenController();

