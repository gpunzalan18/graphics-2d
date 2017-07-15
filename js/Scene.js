var engine = false; 

var bottomEngine = false;
var rightEngine = false;
var leftEngine = false;
var motion = false;
var count = 0;

var Scene = function(gl, sceneNum) {
  var scene = this;

  this.sceneNum = sceneNum;

  this.reached = false;
  this.count = 0;

  this.d1 = false;
  this.d2 = false;
  this.d3 = false;

  this.track1 = 0;
  this.track2 = 0;
  this.track3 = 0;

  this.fireball1 = true;
  this.life = 2; 

  this.explode = false;

  this.landed = false;
  this.outofrangey = false;
  this.captured = false;


  this.sceneNum = sceneNum;
  
  //console.log(sceneNum);

  

  /////////////////////////////////////////////
  //Constructor
  /////////////////////////////////////////////

  this.gameObjects = [];
  this.plasmaObjects = [];
  this.asteroidObjects = [];
  this.camera = new OrthoCamera();

  // calls the variable Texture 2D from Texture.js to create a vertext shader and a fragment shader
  this.vsTrafo2d = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl"); 
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "blue_fs.essl"); 

  //calling the program variable from program.js, taking the vertex and fragment shaders as parameters
  // Program has a commit functions
  this.asteroidProgram = new Program(gl, this.vsTrafo2d, this.fsSolid); 

  //creating a quad object by calling the quad geometry
  this.quadGeometry = new QuadGeometry(gl);

  var cameraposition = this.camera.position;
  var windowSize = this.camera.windowSize;

  ////////////////////////////////////////////////////////
  // 1. ROCKET OBJECT
  this.rocketMaterial = new Material(gl, this.asteroidProgram);
  this.rocketMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/rocket.png"));
  this.rocketMaterial.texIncrement.set(1, 1);

  this.mesh = new Mesh(this.quadGeometry, this.rocketMaterial);
  this.rocketObject = new GameObject2D(this.mesh);

  this.rocketObject.position.set(0, windowSize.y, 0);
  var rocket = this.rocketObject;
  ////////////////////////////////////////////////////////
  // 2. BOOM OBJECT
  this.material = new Material(gl, this.asteroidProgram);
  this.material.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/boom.png"));
  this.material.texIncrement.set(1/6, 1/6);

  this.mesh2 = new Mesh(this.quadGeometry, this.material);
  this.boomObject = new GameObject2D(this.mesh2);
  var boom = this.boomObject;

  ////////////////////////////////////////////////////////
  // 3. AFTER BURNER OBJECT
  this.afterburnerMaterial = new Material(gl, this.asteroidProgram);
  this.afterburnerMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/afterburner.png"));
  this.afterburnerMaterial.texIncrement.set(1, 1);

  this.mesh3 = new Mesh(this.quadGeometry, this.afterburnerMaterial);
  this.burnerObject = new GameObject2D(this.mesh3)

  //this.burnerObject.position.y = this.rocketObject.position.y - .15;


  ////////////////////////////////////////////////////////
  // 4. DIAMOND OBJECT
  this.diamondMaterial = new Material(gl, this.asteroidProgram);
  this.diamondMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/diamond.png"));
  this.diamondMaterial.texIncrement.set(1, 1);

  this.mesh4 = new Mesh(this.quadGeometry, this.diamondMaterial);
  this.diamond1 = new GameObject2D(this.mesh4);
  this.diamond2 = new GameObject2D(this.mesh4);
  this.diamond3 = new GameObject2D(this.mesh4);

  this.diamond1.position.set(0,1);
  this.diamond2.position.set(-.5,2.25);
  this.diamond3.position.set(.75, 1.5);
  
  ////////////////////////////////////////////////////////
  // 5. life OBJECT
  this.diamondMaterial = new Material(gl, this.asteroidProgram);
  this.diamondMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/heart.png"));
  this.diamondMaterial.texIncrement.set(1, 1);

  this.mesh4 = new Mesh(this.quadGeometry, this.diamondMaterial);
  this.lifeObject = new GameObject2D(this.mesh4)
  this.lifeObject2 = new GameObject2D(this.mesh4)

  this.lifeObject.scale.set(.1,.1, .1);
  this.lifeObject2.scale.set(.1,.1, .1);


  ////////////////////////////////////////////////////////
  // 6. FIREBALL OBJECT
  this.fireballMaterial = new Material(gl, this.asteroidProgram);
  this.fireballMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/fireball.png"));
  this.fireballMaterial.texIncrement.set(1, 1);

  this.mesh5 = new Mesh(this.quadGeometry, this.fireballMaterial);
  this.fireballObject = new GameObject2D(this.mesh5);

  this.fireballObject.scale.set(.1,.1,.1);
  this.fireballObject.position.set(cameraposition.x - windowSize.x/2 -.25, cameraposition.y + windowSize.y/1.6 + .25);


  //this.fireballObject.scale.set(5,.5,.1);
  
  ////////////////////////////////////////////////////////
  // 7. Platform  OBJECT
  this.platformMaterial = new Material(gl, this.asteroidProgram);
  this.platformMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/platform.png"));
  this.platformMaterial.texIncrement.set(1, 1);

  this.mesh6 = new Mesh(this.quadGeometry, this.platformMaterial);
  this.platformObject = new GameObject2D(this.mesh6);
  this.platformObject2 = new GameObject2D(this.mesh6);
  this.platformObject.scale.set(.5,.15,.1);
  this.platformObject2.scale.set(.5,.15,.1);

  this.platformObject2.position.set(1, 0);
  this.platformObject.position.set(-1.5, 0);
  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  // 7. Platform semicircle OBJECT
  this.platformendMaterial = new Material(gl, this.asteroidProgram);
  this.platformendMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/platformend.png"));
  this.platformendMaterial.texIncrement.set(1, 1);

  this.mesh7 = new Mesh(this.quadGeometry, this.platformendMaterial);

  this.platformend1Object = new GameObject2D(this.mesh7);
  this.platformend2Object = new GameObject2D(this.mesh7);
  this.platformend3Object = new GameObject2D(this.mesh7);
  this.platformend4Object = new GameObject2D(this.mesh7);

  this.platformend2Object.orientation = 180 * Math.PI/180;
  this.platformend4Object.orientation = 180 * Math.PI/180;

  this.platformend1Object.position.x = this.platformObject.position.x - .28
  this.platformend2Object.position.x = this.platformObject.position.x +.28;
  this.platformend3Object.position.x = this.platformObject2.position.x - .28;
  this.platformend4Object.position.x = this.platformObject2.position.x + .28;

  this.platformend1Object.scale.set(.08,.15,.1);
  this.platformend2Object.scale.set(.08,.15,.1);
  this.platformend3Object.scale.set(.08,.15,.1);
  this.platformend4Object.scale.set(.08,.15,.1);

  ////////////////////////////////////////////////////////
  // 8. Jupiter OBJECT
  this.jMaterial = new Material(gl, this.asteroidProgram);
  this.jMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/jupiter.png"));
  this.jMaterial.texIncrement.set(1, 1);

  this.mesh8 = new Mesh(this.quadGeometry, this.jMaterial);
  this.jupiterObject = new GameObject2D(this.mesh8);

  this.jupiterObject.orientation = 180*Math.PI/180;

  var burner = this.burnerObject;

  ////////////////////////////////////////////////////////
  // 9. pokeball Objects
  this.pokeballmaterial = new Material(gl, this.asteroidProgram);
  this.pokeballmaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/pokeball.png"));
  this.pokeballmaterial.texIncrement.set(1, 1);


  this.mesh10 = new Mesh(this.quadGeometry, this.pokeballmaterial);

  this.pokeballObject = new GameObject2D(this.mesh10);
  this.pokeballObject.position.set(.5, .5);
  this.pokeballObject.scale.set(.17, .15);
  
    var pokeball = this.pokeballObject;
  ////////////////////////////////////////////////////////
  // 10. Plasma Objects
  this.plasmamaterial = new Material(gl, this.asteroidProgram);
  this.plasmamaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/plasma.png"));
  this.plasmamaterial.texIncrement.set(1, 1);

  this.mesh9 = new Mesh(this.quadGeometry, this.plasmamaterial);

    ////////////////////////////////////////////////////////
  // 11. pokemon
  this.pokemonMaterial = new Material(gl, this.asteroidProgram);
  this.pokemonMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/pokemon.png"));
  this.pokemonMaterial.texIncrement.set(1, 1);

  this.mesh11 = new Mesh(this.quadGeometry, this.pokemonMaterial);
  this.pokemonObject = new GameObject2D(this.mesh11);
  this.pokemonObject.scale.set(-.35,.35,.35);
  this.pokemonObject.position.set(1,1);

   ////////////////////////////////////////////////////////
  // 11. pokemon
  this.asteroidMaterial = new Material(gl, this.asteroidProgram);
  this.asteroidMaterial.colorTexture.set(
    new Texture2D(gl, "js/JupiterMedia/flamethrow2.png"));
  this.asteroidMaterial.texIncrement.set(1, 1);

  this.mesh12 = new Mesh(this.quadGeometry, this.asteroidMaterial);
    this.asteroidObject = new GameObject2D(scene.mesh12);
    this.asteroidObject1 = new GameObject2D(scene.mesh12);
  var asteroid = this.asteroidObject;
  

  /////////////////////////////////////////////////  // MOVE FUNCTIONS
  this.rocketObject.position.set(.75,1,0);
  var plasmaObjects = this.plasmaObjects;
  var asteroidObjects = this.asteroidObjects;
  this.rocketObject.move = function(dt, keysPressed){

    

  var xpo, ypo;
    if(motion) { 
      if(x <= window.innerWidth/2){
        xpo = x/(window.innerWidth/2) - 1;
      }
      else if(x > window.innerWidth/2){
        xpo = (x - (window.innerWidth/2))/(window.innerWidth - (window.innerWidth/2));
      }

      if(y <= window.innerHeight/2){
        ypo = 1 - y/(window.innerHeight/2) ;
      }
      else if(y> window.innerHeight/2){
        ypo = -1 * ((y - (window.innerHeight/2))/(window.innerHeight - (window.innerHeight/2))) ;
      }
       
      pokeball.position.x += (xpo * windowSize.x/2)/20 ;
      pokeball.position.y += (ypo * windowSize.y/2)/20 ;

      if(scene.landed == false){
      pokeball.position.addScaled(dt, this.velocity);
      }

    }


    else if(motion == false && scene.reached==true){
      pokeball.scale.x -= .02;
      if(pokeball.scale.x < 0){
        scene.reached = false;
        pokeball.scale.set(.17, .15);
        pokeball.position.set(rocket.position);
      }
    }

    else{
     pokeball.position.set(rocket.position);
      motion = false;
    }

    var distance = Math.pow((Math.pow((rocket.position.x - pokeball.position.x), 2) + Math.pow((rocket.position.y - pokeball.position.y), 2)),.5);
    var dist = Math.pow((Math.pow(xpo * (windowSize.x/2), 2) + Math.pow(ypo * (windowSize.y/2), 2)),.5);
    //console.log(
    if(distance >= dist){
      scene.reached = true;
      motion = false;

    }

    if(this.position.y < scene.jupiterObject.position.y + .55){

    } 





    this.acceleration.set();
    //this.angularVelocity.set();
    //this.velocity.mul(Math.exp(-dt * 0.098));
    this.velocity.mul(Math.exp(-dt * 0.225));


    this.acceleration.y -= .098; //gravity
    if(keysPressed["DOWN"] == true && scene.landed == false){
      engine = true;
      bottomEngine = true;
      this.acceleration.y -= .5;
      
      
    } if(keysPressed["UP"] == true){
      engine = true;
      scene.landed = false;
      bottomEngine = true;
      this.acceleration.y += .5;


      
    } if(keysPressed["LEFT"] == true){
      engine = true;
      leftEngine = true;
      this.torque -= 1;
      this.acceleration.x -= .5;
      this.angularVelocity.x += .005;



    } 


    else if(this.orientation >= 0){
      this.angularVelocity.x -= .0025;
  
    }

    if(keysPressed["RIGHT"] == true){
      engine = true;
      rightEngine = true;
      this.torque -= 1;
      this.acceleration.x += .5;
      this.angularVelocity.x -= .005;
      

    } 
    else if(this.orientation <= 0){
      this.angularVelocity.x += .0025;
    
    }

    

    if(keysPressed["SPACE"] == true){
      engine = true;
      //this.position.set(0,-.5) ;
      location.reload();
    } 

    if(scene.landed == true){
      this.velocity.y = 0;
    }

    
    
    this.velocity.addScaled(dt, this.acceleration);
    this.position.addScaled(dt, this.velocity);

    this.orientation = this.angularVelocity.x;



        

    if(bottomEngine == true){
      burner.scale.set(.2,.109, .1);
      burner.orientation = this.orientation + 55;
      burner.position.y = this.position.y - .185 * Math.cos(this.orientation - .055);
      burner.position.x = this.position.x + .185 * Math.sin(this.orientation - .055);
    }

    else if(rightEngine == true){
      burner.scale.set(.099,.099,.099);

      burner.orientation = this.orientation - 70*Math.PI/180;
      burner.position.y = this.position.y - .129 * Math.sin(this.orientation + 45);
      burner.position.x = this.position.x - .129 * Math.cos(this.orientation + 45);
    }

    else if(leftEngine == true){
      burner.scale.set(.099,.099,.099);
      burner.orientation = this.orientation - 110 *Math.PI/180;
      burner.position.y = this.position.y + .113 * Math.sin(this.orientation - 20);
      burner.position.x = this.position.x + .113 * Math.cos(this.orientation - 20);
    }

    if(engine){
      this.plasmaObject = new GameObject2D(scene.mesh9);
      this.plasmaObject.scale.set(.055,.055,.055);
      this.plasmaObject.position.set(burner.position);
      //this.plasmaObject.position.xyz0mul(burner.modelMatrix);


      this.plasmaObject.move = function(dt, keysPressed){
        //this.position.y -= .02; 

        this.velocity.set(Math.random(5 + 1) - 1, -.5);
        this.position.addScaled(dt, this.velocity);
        this.opacity -= .075;


      }

      scene.plasmaObjects.push(this.plasmaObject);
    }


    if(down && scene.captured){
      var xco, yco;
      if(a <= window.innerWidth/2){
        xco = a/(window.innerWidth/2) - 1;
      }
      else if(a > window.innerWidth/2){
        xco = (a - (window.innerWidth/2))/(window.innerWidth - (window.innerWidth/2));
      }

      if(b <= window.innerHeight/2){
        yco = 1 - b/(window.innerHeight/2) ;
      }
      else if(b> window.innerHeight/2){
        yco = -1 * ((b - (window.innerHeight/2))/(window.innerHeight - (window.innerHeight/2))) ;
      }
       

      if(asteroid.opacity >= 0){
      asteroid.position.x += (xco * windowSize.x/2)/10 ;
      asteroid.position.y += (yco * windowSize.y/2)/10 ;
        if(scene.landed == false){
        asteroid.position.addScaled(dt, this.velocity);
        }
      asteroid.opacity -=.05;
      }
      else if(asteroid.position.x == boom.position.x){
        asteroid.position.set(rocket.position);
        asteroid.opacity = 1;
        //scene.explode = false;
      }
      else{
        //boom.scale.set(.1,.1,.1);
        asteroid.position.x = asteroid.position.x;
        boom.position.set(asteroid.position);
        //scene.explode = true;
      }
    }
    else{
      asteroid.position.set(rocket.position);
      

      asteroid.opacity = 1;
      count += 1;
      }
    

    
  } 
  
  this.pokemonObject.position.set(this.platformObject.position.x - .2, this.platformObject.position.y + .16);
  this.pokemonObject.move = function(dt, keysPressed){
    var distance = Math.abs(this.position.x - pokeball.position.x) + Math.abs(this.position.y - pokeball.position.y);

    if(distance < .18) { 
      scene.captured = true;
    
    }


      }


    
    //this.asteroidObjects.push(this.asteroidObject);
    //this.asteroidObject.position.set(rocket.position);
    this.asteroidObject.move = function(dt, keysPressed){
      this.scale.set(.1,.1,.1);
    }
    

  // Boom
  this.boomObject.move = function(dt, keysPressed){
    this.texOffset.x += 1/6;
    if(this.texOffset.x >= 5/6){
      this.texOffset.y += 1/6;
      this.texOffset.x = 0;
    }

    if(scene.explode){
      this.scale.x -= .028;
      this.scale.y += .0025;
      this.scale.z -= .028;

      // if(!down){
      //   rocket.scale.x -= .025;
      //   rocket.scale.y += .0025;
      //   rocket.scale.z -= .025;
      // }
    }
    if(this.scale.x < 0){
      down = false;
      scene.explode = false;
      this.scale.set(.5,.5,.5);
      rocket.scale.set(.5,.5,.5);
    }



  }


  
  
  this.counted1 = false;
  this.diamond1.move = function(dt, keysPressed){
    this.scale.set(.1,.1,.1);
    this.position.y -= .005;
    
    var distance = Math.abs(this.position.x - rocket.position.x) + Math.abs(this.position.y - rocket.position.y);
    if(distance < .2){
      scene.d1= true;
      if(scene.counted1 == false){ 
        scene.count += 1;
        scene.track1 = scene.count;
        scene.counted1 = true;
        
      } 
    }
    if(this.position.y < cameraposition.y - windowSize.y/2){
      this.position.set(cameraposition.x + .75 - windowSize.x/2, cameraposition.y + windowSize.y/2);
    }
  }

  this.counted2 = false;
  this.diamond2.move = function(dt, keysPressed){
    this.scale.set(.1,.1,.1);
    this.position.y -= .005;
    var distance = Math.abs(this.position.x - rocket.position.x) + Math.abs(this.position.y - rocket.position.y);
    if(distance < .2){
      scene.d2= true;
      if(scene.counted2 == false){ 
        scene.count += 1;
        scene.track2 = scene.count;
        scene.counted2 = true;
       
      } 
    }
    if(this.position.y < cameraposition.y - windowSize.y/2){
      this.position.set(cameraposition.x -.25 , cameraposition.y + windowSize.y/2);
    }
  }


  this.counted3 = false;
  this.diamond3.move = function(dt, keysPressed){
    this.scale.set(.1,.1,.1);
    this.position.y -= .005;
    
    var distance = Math.abs(this.position.x - rocket.position.x) + Math.abs(this.position.y - rocket.position.y);
    if(distance < .2){
      scene.d3= true;
      if(scene.counted3 == false){ 
        scene.count += 1;
        scene.track3 = scene.count;
        scene.counted3 = true;
    
      } 
    }
    if(this.position.y < cameraposition.y - windowSize.y/2){
      this.position.set(cameraposition.x +.75, cameraposition.y + windowSize.y/2);
    }
  }

  this.lifeObject.move = function(dt, keysPressed){
    this.position.set(cameraposition.x + .12 - windowSize.x/2, cameraposition.y + windowSize.y/2 - .1); 
  }

  this.lifeObject2.move = function(dt, keysPressed){
    this.position.set(cameraposition.x + .24 - windowSize.x/2, cameraposition.y + windowSize.y/2 - .1);
  }

  this.fireballObject.move = function(dt, keysPressed){



    if(this.scale.x < 1){
      this.scale.x += .0025;
      this.scale.y += .0025;
      this.scale.z += .0025;
    }
   
    if(this.position.y < cameraposition.y - windowSize.y/1.5){
      this.position.set(cameraposition.x - windowSize.x/2, cameraposition.y + windowSize.y/2);
      this.scale.set();
    }
    else{
      scene.fireball1 = true;


    }

    //console.log(scene.explode);
    var distance = Math.abs(this.position.x - rocket.position.x) + Math.abs(this.position.y - rocket.position.y);
    if(distance < .26){
      scene.explode = true;
      this.position.set(this.position.x, this.position.y);
      boom.position.set(this.position);
      rocket.position.set(this.position);
      
      this.scale.x -= .025;
      this.scale.y += .0025;
      this.scale.z -= .025;

      rocket.scale.x -= .025;
      rocket.scale.y += .0025;
      rocket.scale.z -= .025;

      burner.scale.x -= .025;
      burner.scale.y += .0025;
      burner.scale.z -= .025; 


      if(this.scale.x <= 0){
        scene.fireball1 = false;
        scene.explode = false;
      }
   
    }
    else{
      this.position.x += .01;
      this.position.y -= .01;
    }

    if(scene.fireball1 == false){
      scene.life -= 1;
      scene.fireball1 = true;
      this.position.set(cameraposition.x - windowSize.x/2, cameraposition.y + windowSize.y/2);
      this.scale.set();
      rocket.scale.set(.5,.5,.5);
    }

  }

  

this.platformObject.move = function(dt, keysPressed){

    if(rocket.position.x <= this.position.x + .3 && rocket.position.x >= this.position.x - .3){
      if(rocket.velocity.y < 0 && rocket.position.y - .15 <= this.position.y && rocket.position.y >= this.position.y ){
        rocket.position.set(rocket.position.x, this.position.y + .15);
        cameraposition.set(rocket.position);
        //console.log(scene.camera.position.y);
        scene.landed = true;
        if(Math.abs(rocket.velocity.y) >= 0.7 || Math.abs(rocket.angularVelocity.x) >= 0.25){
          rocket.velocity.y = 0;
          boom.position.set(rocket.position);
          rocket.position.set(boom.position);
          
          
          scene.explode = true; 
          scene.life -= 1;  
        }
      }
    }
    else{
      scene.landed = false; 

    }
  }

  this.platformObject2.move = function(dt, keysPressed){

    if(rocket.position.x <= this.position.x + .3 && rocket.position.x >= this.position.x - .3){
      if(rocket.velocity.y < 0 && rocket.position.y - .15 <= this.position.y && rocket.position.y >= this.position.y ){
        rocket.position.set(rocket.position.x, this.position.y + .15);
        cameraposition.set(rocket.position);
        scene.landed = true;
        if(Math.abs(rocket.velocity.y) >= 0.7 || Math.abs(rocket.angularVelocity.x) >= 0.25){
          rocket.velocity.y = 0;
          boom.position.set(rocket.position);
          rocket.position.set(boom.position);
       
          scene.explode = true; 
          scene.life -= 1;  
        }
      }
    }
    else{
      scene.landed = false; 

    }
  }

  this.jupiterObject.move = function(dt, keysPressed){
    this.scale.set(windowSize.x * 8, 2);
    


    //if(rocket.position.y > this.position.y -.25){
      this.position.set(windowSize.x/10, -1.15);
        
    //}
    //else if (rocket.position.y <this.position.y -.25) {
      //this.position.set(cameraposition.x + windowSize.x/2, cameraposition.y + windowSize.y/2)
    //}

    if(rocket.position.y < this.position.y - 2){
      scene.outofrangey = true;
      scene.life -=1;
      // if(scene.outofrangey){
      //   alert("You lost a life.");
      // }
      rocket.velocity.set();
      rocket.position.set(.75, 2);

    }
    else{
      scene.outofrangey= false;
    }
  }
  //this.platformObject.position.set(-.25, .5, .5);
     // this.position.x = cameraposition.x + windowSize.x/1.5;
    //this.position.y = cameraposition.y + windowSize.y/1.5;
    
  //   this.position.x += .01 * xmultiplier;
  //   this.position.y += .01 * ymultiplier;
  //   if(this.position.x > cameraposition.x + windowSize.x/2){
  //     xmultiplier = -1;
      
  //   }
  //   else if(this.position.x < cameraposition.x - windowSize.x/2){
  //     xmultiplier = 1;
      
  //   }
  //   else if(this.position.y > cameraposition.y + windowSize.y/2){
  //     ymultiplier = -1;
  //   }

  //   else if(this.position.y < cameraposition.y - windowSize.y/2){
  //     ymultiplier = 1;
  //   }

  //   //this.position.y += .003 * ymultiplier;


  
    
      // this.asteroidObject.move = function(dt, keysPressed){
      //   //this.position.y -= .02; 

      //   this.scale.set(.15,.15,.15);

      //     if(a <= window.innerWidth/2){
      //       xpo = a/(window.innerWidth/2) - 1;
      //     }
      //     else if(a > window.innerWidth/2){
      //       xpo = (a - (window.innerWidth/2))/(window.innerWidth - (window.innerWidth/2));
      //     }

      //     if(b <= window.innerHeight/2){
      //       ypo = 1 - b/(window.innerHeight/2) ;
      //     }
      //     else if(b> window.innerHeight/2){
      //       ypo = -1 * ((b - (window.innerHeight/2))/(window.innerHeight - (window.innerHeight/2))) ;
      //     }
           
      //     // this.position.x += (xpo * windowSize.x/2)/20 ;
      //     // this.position.y += (ypo * windowSize.y/2)/20 ;

      //     this.velocity.set(xpo, ypo);

      //     //if(scene.landed == false){
      //     pokeball.position.addScaled(dt, this.velocity);
      //     //}
      //     console.log(xpo,ypo);
      //   //}


      // }

      // scene.asteroidObjects.push(this.asteroidObject);
  


  
  this.gameObjects.push(this.diamond1);
  this.gameObjects.push(this.diamond2);
  this.gameObjects.push(this.diamond3);
  this.gameObjects.push(this.lifeObject);
  this.gameObjects.push(this.lifeObject2);
  this.gameObjects.push(this.jupiterObject);
  this.gameObjects.push(this.fireballObject);
  this.gameObjects.push(this.platformObject);
  this.gameObjects.push(this.platformend1Object);
  this.gameObjects.push(this.platformend2Object);
  this.gameObjects.push(this.platformObject2);
  this.gameObjects.push(this.platformend3Object);
  this.gameObjects.push(this.platformend4Object);
  this.gameObjects.push(this.rocketObject);
  this.gameObjects.push(this.burnerObject);
  this.gameObjects.push(this.boomObject);
  this.gameObjects.push(this.pokeballObject);
  this.gameObjects.push(this.pokemonObject);
  this.gameObjects.push(this.asteroidObject);
  
  

  
  

  //Keeps track of time, helpful when creating a smooth flow => constant time lapse
  this.timeAtLastFrame = new Date().getTime();  
  //console.log(scene.landed);
}


//////////////////////////////////////////////////////////
// UPDATE
/////////////////////////////////////////////////////////
var view = true;
Scene.prototype.update = function(gl, keysPressed, canvas, sceneNum) {



  
  //clear the screen
  gl.clear(gl.COLOR_BUFFER_BIT);




  
  gl.viewport(0,0, canvas.width, canvas.height);
  gl.clearColor(0.05, 0.19, .27, 1);
  this.drawAll(gl,keysPressed,canvas,sceneNum);
  gl.viewport(0,0, canvas.width/4, canvas.height/4);
  gl.clearColor(0.05, 0.19, .27, 1);
  this.drawAll(gl,keysPressed,canvas,sceneNum);

 //clear the screen
  //gl.clear(gl.COLOR_BUFFER_BIT);
  
  if(this.life < 0 && this.explode == false){
    alert("You lost. Continue to play a new game.");
    location.reload();

  }

}



Scene.prototype.drawAll = function(gl, keysPressed, canvas, sceneNum){


  var cameraposition = this.camera.position;
  var windowSize = this.camera.windowSize;
  

  var timeAtThisFrame = new Date().getTime();
  var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  for(var i = 0; i < this.gameObjects.length ; i++){

  gl.enable(gl.BLEND);
  gl.blendFunc(
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA);


    if(i == 14){
      
        for(var x = 0; x < this.plasmaObjects.length ; x++){
          
          this.plasmaObjects[x].updateModelTransformation();
          this.plasmaObjects[x].move(dt, keysPressed);
          this.plasmaObjects[x].draw(this.camera);

          if(this.plasmaObjects.length > 50){
            this.plasmaObjects.splice(x, 1);
          }
        }
    
      
      if(bottomEngine == false && rightEngine == false && leftEngine ==false){
        continue;
      }
    }

    if(this.d1 == true){
      this.diamond1.position.set(cameraposition.x + windowSize.x/2 - (.12 * this.track1), cameraposition.y + windowSize.y/2 - .1);
    }

    if(this.d2 == true){
      this.diamond2.position.set(cameraposition.x + windowSize.x/2- (.12 * this.track2),  cameraposition.y + windowSize.y/2 - .1); 
    }

    if(this.d3 == true){
      this.diamond3.position.set(cameraposition.x + windowSize.x/2 - (.12 * this.track3),  cameraposition.y + windowSize.y/2 - .1);
      
    }

    if(this.fireball1 == false && i == 6){
      continue;
    }
    if(this.captured == true ){
      //this.pokemonObject.scale.set();
      motion = false;
      this.pokemonObject.position.set(cameraposition.x + windowSize.x/2 - .45, cameraposition.y - windowSize.y/2 + .45);
      this.pokemonObject.scale.set(.75,.75);
    }


    //console.log(life);
    if(this.life < 2 && i == 4){
      continue;
    }

    if(this.life < 1 && i == 3){
      continue;
    }

    if(this.explode == false && i == 15){
      continue;
    }
    if(!down && i == 18 && this.captured){
      continue;
    }

    else if(!down && i == 18 && !this.captured){
      continue;
    }
    else if(down && i == 18 && !this.captured){
      continue;
    }

    if(motion==false && i == 16 ) { 
      this.gameObjects[i].move(dt, keysPressed);
      this.gameObjects[i].updateModelTransformation();
      continue;
      }

    // if(!down && i == 18){
    //   this.gameObjects[18].opacity -=.25;
    // }

    this.gameObjects[i].move(dt, keysPressed);
    this.gameObjects[i].updateModelTransformation();


    //if(this.rocketObject.position.y > this.jupiterObject.position.y + .25){
      
      this.camera.position.y = this.rocketObject.position.y;
    //}
    this.camera.position.x = this.rocketObject.position.x;


    this.camera.updateViewProjMatrix();
    this.gameObjects[i].draw(this.camera);
    

  }

  





  //this.landed = false;
}