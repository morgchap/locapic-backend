var express = require('express');
var router = express.Router();
const Places = require('../models/places');


//POST /places : ajout d’un marqueur en base de données (via req.body)

router.post('/places', (req, res) => {
    
    const marker = new Places({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
})
marker.save().then(newDoc => {
    res.json({ result: true })
   })
});

//GET /places/:nickname : récupération de tous les marqueurs d’un utilisateur en fonction de son surnom (via req.params)

router.get('/places/:nickname', (req, res) => {
Places.find({nickname: req.params.nickname}).then(response => {
    if(response.length > 0){
        res.json({result: true, places: response })
    } else {
        res.json({result: true, error: 'nickname not found' })
    }
})
})

//DELETE /places : suppression d’un marqueur à partir de son nom et du surnom de l’utilisateur (via req.body)

router.delete("/places", (req, res) => {
    Places.deleteOne({name : req.body.name, nickname: req.body.nickname,
    }).then(deletedDoc => {
      if (deletedDoc.deletedCount > 0) {
        res.json({result: true});
      } else {
        res.json({ result: false, error: "no places was deleted" });
      }
    });
  });

module.exports = router;

