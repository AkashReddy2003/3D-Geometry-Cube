import * as THREE from "three";
import gsap from "gsap"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
const scene=new THREE.Scene();


const sizes={
  height:window.innerHeight,
  width:window.innerWidth
}

var geometry=new THREE.BoxGeometry(5,5,5);
const material=new THREE.MeshStandardMaterial({
  color:"#00ff83",
  roughness:0.5,
});

const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

const light=new THREE.PointLight(0xffffff,1,100)
light.position.set(10,15,10)
light.intensity=1.3
scene.add(light)
const camera=new THREE.PerspectiveCamera(45,sizes.width/sizes.height);
camera.position.z=20;
scene.add(camera);

const canvas=document.querySelector(".Webgl");
const renderer=new THREE.WebGL1Renderer({canvas});
renderer.setPixelRatio(5)
renderer.setSize(sizes.width,sizes.height);
renderer.render(scene,camera);

const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.autoRotate=true
controls.autoRotateSpeed=5
controls.enableZoom=false

window.addEventListener("resize",()=>{
  sizes.width=window.innerWidth,
  sizes.height=window.innerHeight
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})

const loop=()=>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}

loop()

const tl=gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
tl.fromTo("nav",{y:-100},{y:0})
tl.fromTo(".title",{opacity:0},{opacity:1})

let md=false
let rgb=[]
window.addEventListener("mousedown",()=>{md=true})
window.addEventListener("mouseup",()=>{md=false})
window.addEventListener("mousemove",(e)=>{
  if(md){
    rgb=[
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*225),
      150,
    ]
    let nc=new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{
      r:nc.r,
      g:nc.g,
      b:nc.b,
    })
  }
})


