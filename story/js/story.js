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
    if (nextID == "pickLock") {
        $(".modal-content").load("crackTheLock.html", function() {
            window.targetClicks = getRndInteger(3, 15);
            if ($(".modal")[0].style.display == "none") {
                $(".modal")[0].style.display = "block";
            }

            $(".modal").toggleClass("showModal");
            $(".modal").toggleClass("hideModal");
        });
        return;
    }
    if (nextID.split(" ")[0] == "noKey") {
        //Disable where there was no key
        $(".text").fadeOut(500);
        $(".img").fadeOut(500);
        switch (nextID.split(" ")[1]) {
            case "1":
                //You found an old vinyl record case, look there
                $("table > tbody > tr:nth-child(1) > td:nth-child(1) > a").fadeOut(500, function() {
                    $("table > tbody > tr:nth-child(1) > td:nth-child(1) > a").removeClass("answerRed");
                    $("table > tbody > tr:nth-child(1) > td:nth-child(1) > a").addClass("answerDisabled");
                    $("table > tbody > tr:nth-child(1) > td:nth-child(1) > a").attr("onclick", "");
                    $("table > tbody > tr:nth-child(1) > td:nth-child(1) > a").fadeIn(500);
                    $(".img").html(`<img src="${"images/key/vinyl.jpg"}" alt="Vinyl case" style="width: auto; height: 18vw;"/>`);
                    $(".text").html("<p>Unfortunately the key isn't in the vinyl case</p>");
                    $(".text").fadeIn(500);
                    $(".img").fadeIn(500);
                });
                break;
            case "2":
                //Look behind the curtains, it has to be there
                $("table > tbody > tr:nth-child(1) > td:nth-child(2) > a").fadeOut(500, function() {
                    $("table > tbody > tr:nth-child(1) > td:nth-child(2) > a").removeClass("answerBlue");
                    $("table > tbody > tr:nth-child(1) > td:nth-child(2) > a").addClass("answerDisabled");
                    $("table > tbody > tr:nth-child(1) > td:nth-child(2) > a").attr("onclick", "");
                    $("table > tbody > tr:nth-child(1) > td:nth-child(2) > a").fadeIn(500);
                    $(".img").html(`<img src="${"images/key/curtain.jpg"}" alt="Curtains" style="width: auto; height: 18vw;"/>`);
                    $(".text").html("<p>Unfortunately the key isn't behind the curtains</p>");
                    $(".text").fadeIn(500);
                    $(".img").fadeIn(500);
                });
                break;
            case "3":
                //It has to be in grandpa's old pair of shoes
                $("table > tbody > tr:nth-child(2) > td:nth-child(1) > a").fadeOut(500, function() {
                    $("table > tbody > tr:nth-child(2) > td:nth-child(1) > a").removeClass("answerYellow");
                    $("table > tbody > tr:nth-child(2) > td:nth-child(1) > a").addClass("answerDisabled");
                    $("table > tbody > tr:nth-child(2) > td:nth-child(1) > a").attr("onclick", "");
                    $("table > tbody > tr:nth-child(2) > td:nth-child(1) > a").fadeIn(500);
                    $(".img").html(`<img src="${"images/key/shoes.jpg"}" alt="Shoes" style="width: auto; height: 18vw;"/>`);
                    $(".text").html("<p>Unfortunately the key isn't inside grandpa's shoes</p>");
                    $(".text").fadeIn(500);
                    $(".img").fadeIn(500);
                });
                break;
            case "4":
                //Take a look inside grandpa's old backpack
                $("table > tbody > tr:nth-child(2) > td:nth-child(2) > a").fadeOut(500, function() {
                    $("table > tbody > tr:nth-child(2) > td:nth-child(2) > a").removeClass("answerOrange");
                    $("table > tbody > tr:nth-child(2) > td:nth-child(2) > a").addClass("answerDisabled");
                    $("table > tbody > tr:nth-child(2) > td:nth-child(2) > a").attr("onclick", "");
                    $("table > tbody > tr:nth-child(2) > td:nth-child(2) > a").fadeIn(500);
                    $(".text").html("<p>Unfortunately the key isn't inside grandpa's old backpack</p>");
                    $(".img").html(`<img src="${"images/key/backpack.jpg"}" alt="Backpack" style="width: auto; height: 18vw;"/>`);
                    $(".text").fadeIn(500);
                    $(".img").fadeIn(500);
                });
                break;
            default:
                break;
        }
        return;
    }

    let currentCard = globalJSON.filter(element => element.id == nextID);
    if (currentCard.length == 0) {
        if (nextID.split(" ")[0] == "saddleHorse" ||
            nextID.split(" ")[0] == "pickedGame" ||
            nextID.split(" ")[0] == "playOneMoreGame" ||
            nextID.split(" ")[0] == "playManyMoreGame" ||
            nextID.split(" ")[0] == "foundKey") {
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
            //Load img if we have one
            if (currentCard.image != null || currentCard.id == "saddleHorse" || currentCard.id == "foundKey") {
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
                } else if (currentCard.id == "foundKey") {
                    switch (nextID.split(" ")[1]) {
                        case "1":
                            //You found an old vinyl record case, look there
                            imgHTML = `<img src="${"images/key/vinyl.jpg"}" alt="Vinyl case" style="width: auto; height: 18vw;"/>`;
                            innerHtmlContent = innerHtmlContent.replaceAll("?{0}", "You find the key inside the record case.");
                            break;
                        case "2":
                            //Look behind the curtains, it has to be there
                            imgHTML = `<img src="${"images/key/curtain.jpg"}" alt="Curtains" style="width: auto; height: 18vw;"/>`;
                            innerHtmlContent = innerHtmlContent.replaceAll("?{0}", "You find the key behind the curtains.");
                            break;
                        case "3":
                            //It has to be in grandpa's old pair of shoes
                            imgHTML = `<img src="${"images/key/shoes.jpg"}" alt="Shoes" style="width: auto; height: 18vw;"/>`;
                            innerHtmlContent = innerHtmlContent.replaceAll("?{0}", "You find the key inside one of granpa's old shoes.");
                            break;
                        case "4":
                            //Take a look inside grandpa's old backpack
                            imgHTML = `<img src="${"images/key/backpack.jpg"}" alt="Backpack" style="width: auto; height: 18vw;"/>`;
                            innerHtmlContent = innerHtmlContent.replaceAll("?{0}", "You find the key inside granpa's old backpack.");
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
            //Load text
            $("body > div > div.text").html(innerHtmlContent);
            if (currentCard.id == "attic2") {
                //Hide the key randomly
                let keyPlacement = getRndInteger(1, 4);
                console.log("Key is hidden in answer ", keyPlacement);
                currentCard.responses[keyPlacement].destination = "foundKey " + keyPlacement;
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