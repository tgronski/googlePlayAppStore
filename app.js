const express= require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const apps= require('./apps-data.js');

app.get('/apps', ( req, res) => {
    const { search = "", sort } = req.query;
  
    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of rating or app');
      }
    }
    let action="Action"
    let casual="Casual"
    let strategy='Strategy'
    let puzzle='Puzzle'
    let card="Card"
    let arcade="Arcade"
    let actionRes = apps
          .filter(app =>
              app
                .Genres
                // // .toLowerCase()
                .includes(action));
    let strategyRes = apps
          .filter(app =>
              app
                .Genres
                .includes(strategy));
    let casualRes = apps    
            .filter(app =>
                    app 
                    .Genres
                    .includes(casual))
    let arcadeRes = apps    
        .filter(app =>
            app 
            .Genres
            .includes(arcade))
    let cardRes = apps    
            .filter(app =>
                app 
                .Genres
                .includes(card))
    let puzzleRes = apps    
                .filter(app =>
                    app 
                    .Genres
                    .includes(puzzle))
  
    // if (sort) {
    //   results
    //     .sort((a, b) => {
    //       return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    //   });
    // }
    // if (sort) {
    //     if (!['Action', 'Puzzle','Strategy','Casual','Arcade', 'Card'].includes(res)) {
    //       return res
    //         .status(400)
    //         .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card');
    //     }
    //   }
    let results =(actionRes).concat(strategyRes).concat(casualRes).concat(puzzleRes).concat(cardRes).concat(arcadeRes)
   


    if(results.length>0){
    res
    .json(results)
    }
    else {
    res 
    .status(400)
    .send('No results in the Action, Puzzle, Strategy, Casual, Arcade, or Card genres');
    }
});

  app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });