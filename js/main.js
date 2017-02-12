// Simon JS by Gboyega
var SimonGame;

document.addEventListener("DOMContentLoaded", function() {
  
  SimonGame = new Simon ();
  
});



var Simon = function () {

    // Private Property: Keep OFF
    var 
        $this = this, 
        strict = false, 
        power = 'off', 
        seq = [], 
        pushed = [], 
        finishLine = 4, 
        dialerDelay = null, 
        animateInterval = null, 
        pause = null;

    // Helper fn
    var padLeft = function (str, pad, len) {
      var ps = ''; str += '';
      for (var i=0; i<len; i++) ps += pad;

      return ps.substring(0, ps.length - str.length) + str;
    };

    this.toggleStrictMode = function (m) {
        if (!this.isOn()) return false;
        
        strict = (typeof m === 'boolean') ? m : !strict;
        
        if (strict) strictModeBtn.classList.add('on'); 
        else strictModeBtn.classList.remove('on');

        return strict; // new mode...
    };


    this.reset = function () {
        clear();

        this.dial();
    };
    
    var clear = function () {
        window.clearTimeout(pause);
        window.clearTimeout(dialerDelay);
        window.clearInterval(animateInterval);
        seq = pushed = [];
    };

    this.pushButton = function (key) {
        window.clearTimeout(pause);
        window.clearTimeout(dialerDelay);
        
        push(key);
        pushed.push(parseInt(key));

        for (var i=0; i<pushed.length; i++) {
            if (seq[i] !== pushed[i]) {
                // eerrrhnn!! wrong number!
                this.youLose(); 
                
                return;
            }
            

        }
         
        if (pushed.length !== seq.length) {
            wait();
            
        } else if (seq.length < finishLine) {
            dialerDelay = window.setTimeout(this.dial.bind(this), 1000);
        } else {
            // Il a gagner!!
            this.youWin();
        }

    };

    // internal method only
    var push = function (key) {
        var button = document.getElementById('tile-'+key);

        button.classList.add('down');
        window.setTimeout(function () {
            button.classList.remove('down');
        }, 500);

        // blip...
        createjs.Sound.play(key).volume = 0.5;


    };
    
    var wait = function () {
        window.clearTimeout(pause);
        
        // wait
        var ms = 6000+(seq.length*800);
        pause = window.setTimeout(function () {
            $this.youLose();
        }, ms);
    };
    

    this.dial = function () {
        window.clearTimeout(pause);
        
        pushed = [];
        seq.push(Math.floor(Math.random()*4)+1);
        this.animate(seq, 800);
        lcd.innerHTML = padLeft(seq.length, '0', 2);
        
        // wait
        wait();
    };

    this.redial = function () { 

        pushed = [];
        lcd.innerHTML = padLeft(seq.length, '0', 2);
        $this.animate(seq, 800);

        wait();
        
    };

    this.animate = function (seq, speed, cb) {
        
        clearInterval(animateInterval);
        var i = 0;
        lock(); // lock tiles
        

        animateInterval = window.setInterval(function () {
            
            if (!seq || i >= seq.length) {
               clearInterval(animateInterval);
               unlock(); // unlock tiles;
               
               return (typeof cb === 'function') ? cb() : false;
            }
            
            push(seq[i++]);
        }, speed);

    };
    
    
    var lock = function () {
        padLock.style.display = 'block';
    };
    
    var unlock = function () {
        padLock.style.display = 'none';
    };

 
    this.youWin = function () {
        
        window.clearTimeout(pause);
        window.clearTimeout(dialerDelay);

        lock();
        
        lcd.innerHTML = '**'; 
        var i = 4;
        var lastTile = document.getElementById('tile-' + seq.concat([]).pop());

        
        var blink = window.setInterval(function () {
            
            if (i-- < 1) {
               clearInterval(blink);
               lastTile.classList.remove('down');
               lcd.classList.add('on');
               
               clear();
               return;
            }
            
            lastTile.classList.toggle('down');
            lcd.classList.toggle('on');
            
            createjs.Sound.play(1).volume = 0.5;
            
        }, 200);

    };    

    this.youLose = function () {

        lock();
        
        lcd.innerHTML = '!!'; 
        lcd.classList.add('red');
        var i = 4;
        var blink = window.setInterval(function () {
            
            if (i-- < 1) {
               clearInterval(blink);
               lcd.classList.remove('red');
               lcd.classList.add('on');
               
               if (strict) { 
                   $this.reset();
               } else {
                   $this.redial(true);
               } 
               
               return;
            }

            if (lcd.classList.contains('on')) lcd.classList.remove('on', 'red');
            else lcd.classList.add('on', 'red');
            
        }, 200);
        


    };  
    
    this.start = function () {
        if (this.isOn()) this.dial();
    };
    
    this.off = function () {
        
        clear();

        lock();
        power = 'off';
        lcd.innerHTML = '--';
        lcd.classList.remove('on');
        
        powerBtn.classList.remove('on');
        playBtn.classList.add('disabled');
        strictModeBtn.classList.add('disabled');
        
        Array.prototype.map.call(tiles, function (t) {
            t.classList.remove('on');
        });
    };
    
    
    this.on = function () {

        power = 'on';
        clear();
        lcd.innerHTML = '--';
        lcd.classList.add('on');
        
        powerBtn.classList.add('on');
        playBtn.classList.remove('disabled');
        strictModeBtn.classList.remove('disabled');
        
        Array.prototype.map.call(tiles, function (t) {
            t.classList.add('on');
        });

    };
    
    
    this.togglePower = function () {
        return this.isOn() ? this.off() : this.on();
    };
    
    this.isOn = function () {
        return (power === 'on');
    };
    
    
    // ------------------ INIT UI ----------------- //
    
    var padLock = document.getElementById('pad-lock');
    var lcd = document.getElementById('lcd');
    var powerBtn = document.getElementById('power-btn');
    var playBtn = document.getElementById('play-btn');
    var strictModeBtn = document.getElementById('strict-btn');
    var tiles = document.querySelectorAll('.tile');
    var btns = document.querySelectorAll('.sbtn');
    for (var i=0; i<btns.length; i++) {
      var type = btns[i].getAttribute('data-action')+'';

      switch (type) {

        case 'push':
          btns[i].addEventListener(
            'click', 
            function (e) { 
                var v = this.getAttribute('data-value')+'';
                $this.pushButton(v); 
            }
          );
          break;
          
        case 'power':
          btns[i].addEventListener(
            'click', 
            this.togglePower.bind(this)
          );
          break;
          
        case 'strict-mode':
          btns[i].addEventListener(
            'click', 
            this.toggleStrictMode.bind(this)
          );
          break;
          
        case 'start':
          btns[i].addEventListener(
            'click', 
            this.start.bind(this)
          );
          break;


      }
    }
    
    
    // -------------- INIT BOOM BOX ------------- //
    
    createjs.Sound.alternateExtensions = ["mp3"];
    var audioBaseURL = "audio/simonSound"; // "https://s3.amazonaws.com/freecodecamp/simonSound";
    for (var i=1;i<5;i++) {
        createjs.Sound.registerSound(audioBaseURL+i+".mp3", i);
    }
    
    
    

};

