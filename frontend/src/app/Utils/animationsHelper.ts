export class AnimationsHelper{

   public Animate(animationName:string,element:any){
      element.classList.add("animated");
      element.classList.add(animationName);
      setTimeout(function () {
        element.classList.remove("animated");
        element.classList.remove(animationName);
      }, 700)
    }
  public  AnimateWithCallback(animationName:string,element:any,callback:Function,) {
      element.classList.add("animated");
      element.classList.add(animationName);
      setTimeout(function () {
          element.classList.remove("animated");
          element.classList.remove(animationName);
          callback();
      }, 700)

   }

}
