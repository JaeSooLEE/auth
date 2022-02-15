const { syncBuiltinESMExports } = require("module");
const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");





export class LoginTester{

async example(){
    
    var searchString = "Automation testing with Selenium and JavaScript";
 

       //To wait for browser to build and launch properly
       let driver = await new Builder().forBrowser("chrome").build();

       console.log("test1")
    try{
        //To fetch http://google.com from the browser with our code.
        await driver.get("http://localhost:4200/login");
            

        let currentURL = driver.getCurrentUrl()
        let previousUrl = currentURL
        // webDriver.findElement(By.id("inputTag")).getAttribute("value")
        await driver.findElement(By.name("email")).sendKeys("test@pactenovation.fr")
        await driver.findElement(By.name("password")).sendKeys("Test123")
        await driver.findElement(By.id("signButton")).click()
        
        // await driver.navigate().to("http://localhost:4200/errorManagement")

        // await driver.wait(until.elementLocated(By.id('displayErr')), 5 * 1000).then(el =>{
        //     el.click()
        // })
        // await driver.executeScript("alert('bla')")

        let display = driver.wait(until.elementLocated(By.id('displayErr')), 5 * 1000);
        await display.click()
        await driver.getClass().getDateTime()
        
        
        // await driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS)
        // await driver.findElement(By.id("displayErr")).click()
        
 
        //Verify the page title and print it
        var title = await driver.getTitle();
        console.log('Title is:',title);
        //It is always a safe practice to quit the browser after execution
        await driver.quit();
        return true
    }catch (error) {
        console.log("fail")
        await driver.quit();
        return false
    }
}
}
// example()
