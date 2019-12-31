export class AsyncHelper{

 public sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}


}
