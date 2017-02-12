<!DOCTYPE html>
<html>
    <head>
        <title>Free Code Camp: Simon</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"> -->
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        
        
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/soundjs-0.6.2.min.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </head>
<body>

  <div class="container-fluid">
      
      
    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1">
        <div class="row">
          <div class="col-xs-12">
            <div id="card-1" class="main-wrap">

              <h1 class="main-header text-center">Simon &reg;</h1>
              
              

                <div class="center-block game-wrap">
                    <div class="sdash-wrap">
                        <div class="sdash">

                            
                            <div class="simon-brand"><span>simon &reg;</span></div>

                            <div class="row">

                                <div class="col-xs-12 text-center">
                                    <div id="lcd" class="text-center">--</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div id="pad-lock"></div>

                    <div id="tile-1" class="sbtn tile green" data-action="push" data-value="1"></div>
                    <div id="tile-2" class="sbtn tile red" data-action="push" data-value="2"></div>
                    <div id="tile-3" class="sbtn tile blue" data-action="push" data-value="3"></div>
                    <div id="tile-4" class="sbtn tile yellow" data-action="push" data-value="4"></div>
                </div>
              
              
                <div class="row lo-buttons">
                  <div class="col-xs-4 text-right">
                    <div id="power-btn" class="sbtn" data-action="power"><span class="glyphicon glyphicon-off"></span></div>
                  </div>
                  <div class="col-xs-4 text-center">
                    <div id="play-btn" class="sbtn disabled" data-action="start"><span class="glyphicon glyphicon-play"></span></div>
                  </div>
                  <div class="col-xs-4 text-left">
                    <div id="strict-btn" class="sbtn disabled" data-action="strict-mode"><span class="glyphicon glyphicon-fire"></span></div>
                  </div>
                </div>
              
              </div>



            <div class="credit text-center">Coded by <a href="https://freedcodecamp.com/gboyega" target="_blank">Gboyega Dada</a></div>

          </div>
        </div>
      </div>
    </div>
  </div>

</body>
    
</html>