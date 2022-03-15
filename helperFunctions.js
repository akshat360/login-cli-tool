import figlet from "figlet";

//to show message in cool format
export const showMessage=(testValue)=>figlet(testValue, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});