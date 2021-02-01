//CUSTOM CARDS:
//PUT ON A RECORD
//LOCK PICKING AND FIND THE KEY
//PICK GAME
//HORSE PICKING
//
var globalJSON;

function loadJson() {
    let jsonLocation = window.location.href;
    jsonLocation = jsonLocation.split("story.html")[0] + "data/story.json";
    $.getJSON(jsonLocation, function(data) {
        globalJSON = data.story;
        console.log("JSON loaded", data);
        nextCard("start");
    });
}

function nextCard(nextID) {
    let currentCard = globalJSON.filter(element => element.id == nextID);
    if (currentCard.length == 0) {
        if (nextID.split(" ")[0] == "saddleHorse" ||
            nextID.split(" ")[0] == "pickedGame" ||
            nextID.split(" ")[0] == "playOneMoreGame" ||
            nextID.split(" ")[0] == "playManyMoreGame") {
            currentCard = globalJSON.filter(element => element.id == nextID.split(" ")[0]);
        }
    }
    if (currentCard.length == 0) {
        console.error(`Couldn't find card with id ${nextID}`);
        alert(`Couldn't find card with id ${nextID}`);
    } else {
        if (currentCard.length > 1) {
            let rndId = getRndInteger(0, currentCard.length - 1);
            console.log("Chose id ", rndId);
            currentCard = currentCard[rndId];
        } else {
            currentCard = currentCard[0];
        }
        $(".content").fadeOut(1000, function() {
            var innerHtmlContent = currentCard.content;
            if (nextID.split(" ")[0] == "pickedGame" ||
                nextID.split(" ")[0] == "playOneMoreGame" ||
                nextID.split(" ")[0] == "playManyMoreGame") {
                innerHtmlContent = innerHtmlContent.replaceAll("?{0}", nextID.split(" ")[1]);
                currentCard.image.file = `games/${nextID.split(" ")[1]}.jpg`;
            }
            if (nextID.split(" ")[0] == "pickedGame") {
                //Pass the argument to the next answer
                for (var i = 0; i < currentCard.responses.length; i++) {
                    currentCard.responses[i].destination += " " + nextID.split(" ")[1];
                }
            }
            //Load text
            $("body > div > div.text").html(innerHtmlContent);
            //Load img if we have one
            if (currentCard.image != null || currentCard.id == "saddleHorse") {
                let imgHTML;
                if (currentCard.id == "saddleHorse") {
                    switch (nextID.split(" ")[1]) {
                        case "1":
                            imgHTML = "<img src='images/horses/horseOne.jpg' style='width: 350px; height: 50%;' />";
                            break;
                        case "2":
                            imgHTML = "<img src='images/horses/horseTwo.jpg' style='width: 350px; height: 50%;' />";
                            break;
                        case "3":
                            imgHTML = "<img src='images/horses/horseThree.jpg' style='width: 350px; height: 50%;' />";
                            break;
                        case "4":
                            imgHTML = "<img src='images/horses/horseFour.jpg' style='width: 350px; height: 50%;' />";
                            break;
                        default:
                            break;
                    }
                } else if (currentCard.image.customStyle != null) {
                    imgHTML = `<img src="${"images/" + currentCard.image.file}" alt="${currentCard.image.placeholder}" style="${currentCard.image.customStyle}" />`;
                } else {
                    imgHTML = `<img src="${"images/" + currentCard.image.file}" alt="${currentCard.image.placeholder}" />`;
                }
                $("body > div > div.img").html(imgHTML);

            } else {
                $("body > div > div.img").html("");
            }
            //Load responses
            if (currentCard.responses.length == 1) {
                $("body > div > div.responses").html(`
                <table>
                    <thead>
                        <tr>
                        <th><a class="answerButton answerGreen" onclick="nextCard('${currentCard.responses[0].destination}')">${currentCard.responses[0].content}</a></th>
                        </tr>
                    </thead>
                </table>
                `);
            } else if (currentCard.responses.length == 2) {
                $("body > div > div.responses").html(`
                <table>
                    <thead>
                        <tr>
                        <th style="width:50%"><a class="answerButton answerGreen" onclick="nextCard('${currentCard.responses[0].destination}')">${currentCard.responses[0].content}</a></th>
                        <th style="width:50%"><a class="answerButton answerRed" onclick="nextCard('${currentCard.responses[1].destination}')">${currentCard.responses[1].content}</a></th>
                        </tr>
                    </thead>
                </table>
                `);
            } else if (currentCard.responses.length == 3) {
                $("body > div > div.responses").html(`
                <table>
                    <thead>
                        <tr>
                        <td colspan="2" style="width: 100%"><a class="answerButton answerGreen fullWidth" onclick="nextCard('${currentCard.responses[0].destination}')">${currentCard.responses[0].content}</a></td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="width:50%"><a class="answerButton answerRed" onclick="nextCard('${currentCard.responses[1].destination}')">${currentCard.responses[1].content}</a></td>
                        <td style="width:50%"><a class="answerButton answerBlue" onclick="nextCard('${currentCard.responses[2].destination}')">${currentCard.responses[2].content}</a></td>
                      </tr>
                    </tbody>
                </table>
                `);
            } else if (currentCard.responses.length == 4) {
                $("body > div > div.responses").html(`
                <table>
                    <thead>
                        <tr>
                        <td style="width:50%"><a class="answerButton answerGreen" onclick="nextCard('${currentCard.responses[0].destination}')">${currentCard.responses[0].content}</a></td>
                        <td style="width:50%"><a class="answerButton answerRed" onclick="nextCard('${currentCard.responses[1].destination}')">${currentCard.responses[1].content}</a></td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="width:50%"><a class="answerButton answerBlue" onclick="nextCard('${currentCard.responses[2].destination}')">${currentCard.responses[2].content}</a></td>
                        <td style="width:50%"><a class="answerButton answerYellow" onclick="nextCard('${currentCard.responses[3].destination}')">${currentCard.responses[3].content}</a></td>
                      </tr>
                    </tbody>
                </table>
                `);
            } else if (currentCard.responses.length == 5) {
                $("body > div > div.responses").html(`
                <table>
                    <thead>
                        <tr>
                        <td colspan="2" style="width: 100%"><a class="answerButton answerGreen fullWidth" onclick="nextCard('${currentCard.responses[0].destination}')">${currentCard.responses[0].content}</a></td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="width:50%"><a class="answerButton answerRed" onclick="nextCard('${currentCard.responses[1].destination}')">${currentCard.responses[1].content}</a></td>
                        <td style="width:50%"><a class="answerButton answerBlue" onclick="nextCard('${currentCard.responses[2].destination}')">${currentCard.responses[2].content}</a></td>
                      </tr>
                      <tr>
                        <td style="width:50%"><a class="answerButton answerYellow" onclick="nextCard('${currentCard.responses[3].destination}')">${currentCard.responses[3].content}</a></td>
                        <td style="width:50%"><a class="answerButton answerOrange" onclick="nextCard('${currentCard.responses[4].destination}')">${currentCard.responses[4].content}</a></td>
                      </tr>
                    </tbody>
                </table>
                `);
            }
            $(".content").fadeIn(1000, function() {
                console.log("FADED IN");
            });
        });
    }
    console.log(currentCard);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}