/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
    address: "localhost", // Address to listen on, can be:
                          // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
                          // - another specific IPv4/6 to listen on a specific interface
                          // - "", "0.0.0.0", "::" to listen on any interface
                          // Default, when address config is left out, is "localhost"
    port: 8080,
    ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
                                                           // or add a specific IPv4 of 192.168.1.5 :
                                                           // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
                                                           // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
                                                           // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

    language: "sk",
    timeFormat: 24,
    units: "metric",

    modules: [
        {
            module: "alert",
            classes: "default everyone"
        },
        {
            module: "updatenotification",
            position: "top_bar",
            classes: "default everyone"
        },
        {
            module: "clock",
            position: "top_left",
            classes: "default everyone"
        },
        {
            module: "MMM-Meniny",
            position: "top_left",
            config: {
                message: "Dnes má meniny <i>$TODAY$</i>."
            }
        },
        {
            module: "calendar",
            header: "Slovenské sviatky",
            position: "top_left",
            classes: "default everyone",
            config: {
                calendars: [
                    {
                        url: "https://calendar.zoznam.sk/icalendar/create-vcard-multiple.php?fName=sk&hy=<year>"
                    }
                ]
            }
        },
        {
            module: "weather",
            position: "top_right",
            classes: "default everyone",
            config: {
                type: "current",
                location: "Bratislava",
                locationID: "3060972",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
                apiKey: "1486088161937d2d1e39359d6f48fd37",
                lang: "sk"
            }
        },
        {
            module: "weather",
            header: "Predpoveď počasia",
            position: "top_right",
            classes: "default everyone",
            config: {
                type: "daily",
                location: "Bratislava",
                locationID: "3060972",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
                apiKey: "1486088161937d2d1e39359d6f48fd37",
                lang: "sk"
            }
        },
        /*{
            module: "calendar",
            header: "GMail",
            position: "top_left",
            classes: "Filip",
            config: {
                calendars: [
                    {
                        url: "https://calendar.google.com/calendar/ical/f.stec61%40gmail.com/private-9b488e1be3dbe390aa438a3f75bd2280/basic.ics"
                    },
                ]
            }
        },*/
        {
        	module: "compliments",
        	position: "lower_third",
        	classes: "default everyone",
            config: {
                compliments: {
                    anytime: [
                        "Ak sa ti nepáči, kde si, pohni sa, nie si strom.",
                        "Nehovor, že to nejde. Radšej povedz, že to zatiaľ neovládaš.",
                        "Čo by som bez teba robil?",
                        "Vtipy sú omnoho zábavnejšie, keď ich hovoríš ty.",
                        "Máš dobrý vkus na oblečenie!"
                    ],
                    morning: [
                        "Kto chce hýbať svetom, musí pohnúť najskôr sám sebou.",
                        "Neznič si dobrý deň premýšľaním o zlom včerajšku.",
                        "Každé ráno na svoje konto dostaneš 24 hodín. Záleží iba na tebe, ako ich využiješ.",
                        "Žeby bol čas na kávu?",
                        "Dnes je pekne, dnes by to išlo!"
                    ],
                    afternoon: [
                        "Jaskyňa do ktorej sa bojíš vstúpiť, ukrýva poklad ktorý hľadáš.",
                        "Ty si ešte lepší ako jednorožec, pretože si skutočný.",
                        "Ten, kto ťa vychoval, si zaslúži medailu za výborne odvedenú prácu."
                    ],
                    evening: [
                        "Sedemkrát spadni, osemkrát vstaň.",
                        "V tých šatách vyzeráš naozaj úžasne.",
                        "Čo tak jedho chladené?",
                        "Zaslúžený oddych po dobre odvedenej práci."
                    ]
                }
            }
        },
        {
        	module: "newsfeed",
        	position: "bottom_bar",
        	classes: "default everyone",
        	config: {
                updateInterval: "15000",
        		feeds: [
        			{
        				title: "TA3",
        				url: "http://www.ta3.com/rss/all/vsetky-novinky.html"
        			},
        			{
        				title: "DenníkN",
        				url: "http://www.dennikn.sk/minuta/feed/?cat=2386"
        			},
        			{
        				title: "Pravda",
        				url: "http://spravy.pravda.sk/rss/xml/"
        			}
        		],
        		showSourceTitle: true,
        		showPublishDate: true,
        		broadcastNewsFeeds: true,
        		broadcastNewsUpdates: true,
        		ignoreOldItems: true,
        		showDescription: true
        	}
        },
        // {
        //     module: 'MMM-PIR-Sensor', 
        //     position: "top_center", // Remove this line to avoid having an visible indicator
        //     config: {
        //         sensorPin: 23,
        //         powerSavingDelay: 40, // Turn HDMI OFF after 60 seconds of no motion, until motion is detected again
        //         preventHDMITimeout: 0, // Turn HDMI ON and OFF again every 4 minutes when power saving, to avoid LCD/TV timeout
        //         supportCEC: false, 
        //         powerSavingNotification: true,
        //         powerSavingMessage: "Monitor prechádza do spánkového režimu",
        //         presenceIndicator: "fa-eye", // Customizing the indicator
        //         presenceOffIndicator: "fa-eye-slash", // Customizing the indicator
        //         presenceIndicatorColor: "#f51d16", // Customizing the indicator
        //         presenceOffIndicatorColor: "#2b271c", // Customizing the indicator
        //     }
        // }
        // {
        // 	module: "MMM-Facial-Recognition",
        // 	config: {
        // 		trainingFile: "modules/MMM-Facial-Recognition/training.xml",
        // 		interval: 2,
        // 		logoutDelay: 15,
        // 		users: ["Filip"],
        // 		defaultClass: "default",
        // 		everyoneClass: "everyone",
        // 		welcomeMessage: true
        // 	}
        // },
    ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
