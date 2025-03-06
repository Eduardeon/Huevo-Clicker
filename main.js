let TotalHPS=0;
let eggtext = document.getElementById('Eggtext');
let TotalClicks=0;
let Huevos=0;
let quotaAchivement=0;
SendtoText();
setInterval(() => {
    document.getElementById('HPStext').textContent = `${TotalHPS} Huevos por segundo`;
    TotalHPS = gallinero.HPS + Sabrina.HPS + Carol.HPS + Sebastian.HPS + Diego.HPS;
    Huevos += TotalHPS;
    CheckAllAchievements();
    SendtoText();
}, 1000);
console.log("Que haces mirando aquí pillín?");
console.log("Que no se te ocurra hacer alguna huevada en mi increíble código.");
function EggClick() {
    let clickValue=1;
    Huevos += clickValue;
    TotalClicks++;
    SendtoText();
    PlaySound(soundPaths[Math.round(Math.random()*2)]);
}
function SendtoText()
{
    if(Math.round(Huevos)==1)
    {
       eggtext.textContent =`${Math.round(Huevos)} Huevo`;
    }
    else{
        eggtext.textContent =`${Math.round(Huevos)} Huevos`;
    }
}
class Building{
    static count = 0;
    static Instances = [];
    constructor(basecost,EggValue,name){
        this.basecost = basecost;
        this.EggValue = EggValue;
        this.name = name;
        this.quantity = 0;
        this.price = basecost;
        this.HPS = 0;
        this.instanceId = Building.count++;
        Building.Instances.push(this);
    }
    buy() {
        if(Huevos >= this.price)
        {
            this.quantity++;
            Huevos -= this.price;
            this.price =Math.round((this.basecost)*(1.15)**this.quantity);
            SendtoText();
            document.getElementById(`${this.name}`).textContent = `${this.quantity}`;
            document.getElementById(`${this.name}.price`).textContent = `${this.price}h`;
            this.HPS = this.EggValue * this.quantity;
            PlaySound(`Button-Sound.mp3`);
            return this.price;
        }
        else{
            PlaySound(`Audio-Error.mp3`);
            /*if(Math.round(this.price-Huevos)==1)
            {
            alert(`Te falta un Huevo.`)
            }
            else
            {
            alert(`Te faltan ${Math.round(this.price-Huevos)} Huevos.`)  
            }*/
        }
    }
}
class Achievement{
    static count = 0;
    static TotalAchimentsOwned = 0;
    static Instances = [];
    constructor(requirements,quota,name,type){
        this.instanceId = Achievement.count++;
        this.requirements = requirements;
        this.quota = quota;
        this.name = name;
        Achievement.Instances.push(this);
        let AchievementAcquired = false;
        this.AchievementAcquired = AchievementAcquired;
        this.type = type;

        this.Achievementdiv = document.createElement('div');
        this.Achievementnametext = document.createElement('h2');
        this.Achievementwontext = document.createElement('h2');

        this.Achievementdiv.className = 'achievement';
        this.Achievementwontext.className = 'achievementwon';
        this.Achievementnametext.className = 'achievementname';

        this.Achievementnametext.textContent = `${this.name}`;
        this.Achievementwontext.textContent = `Logro adquirido`;
        this.Achievementdiv.id = `${this.instanceId}.achievement`;
        document.getElementsByTagName("body")[0].appendChild(this.Achievementdiv);
        this.Achievementdiv.appendChild(this.Achievementnametext);
        this.Achievementdiv.appendChild(this.Achievementwontext);
    }
    CheckWin()
    {
        if(this.AchievementAcquired == false)
        {
            if(this.type=='Huevo'){this.quota = Huevos;}
            if(this.type=='Click'){this.quota = TotalClicks;}
            if(this.quota >= this.requirements){
                this.AchievementAcquired = true;
                PlaySound(`Audio-Achievement-2.mp3`);
                this.Achievementdiv.style.display = 'block';
                setTimeout(() => {
                    this.Achievementdiv.style.animationName = 'top2bottom';
                    this.Achievementdiv.style.animationDuration = '0.5s';
                    setTimeout(() => {
                        this.Achievementdiv.style.display = 'none';
                    }, 250);
                }, 4000);
            }
        }
    }
}
function CheckAllAchievements(){
    for (let index = 0; index < Achievement.Instances.length; index++) {
        Achievement.Instances[index].CheckWin();
    }
}
const soundPaths = [`Egg-breaking-1.mp3`,`Egg-breaking-2.mp3`,`Egg-breaking-3.mp3`]
function PlaySound(soundPath)
{
    var snd = new Audio(); // buffers automatically when created
    snd.src = soundPath;
    snd.play();
}
function SetEggColor(r,g,b){
    document.getElementById('huevo').style.backgroundColor = `rgb(${r},${g},${b})`;
}
// Buildings
let gallinero = new Building(15,0.1,'gallinero');
let Sabrina = new Building(100,1,'Sabrina');
let Carol = new Building(1100,8,'Carol');
let Sebastian = new Building(12000,47,'Sebastian');
let Diego = new Building(130000,260,"Diego");
// Achievements
let Huevos69 = new Achievement(69,quotaAchivement,"69 jajajajajaj",'Huevo');
let Huevos1000 = new Achievement(1000,quotaAchivement,"HUEVOOOOO",'Huevo');
let DiegoHUEVO = new Achievement(1000000,quotaAchivement,"Alcanzaste la cúspide de la huevitud eres el verdadero Diego",'Huevo');
let Click1 = new Achievement(1,quotaAchivement,"No me toques el huevo",'Click');
let Click100 = new Achievement(100,quotaAchivement,"Eres un gran toca huevos",'Click');
let Click1000 = new Achievement(1000,quotaAchivement,"Eres el más toca huevos (Sebastian)",'Click');