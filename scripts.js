// Source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
let urlParams = {};
(window.onpopstate = function () {
    let match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);

    while (match = search.exec(query)) {
        if (decode(match[1]) in urlParams) {
            if (!Array.isArray(urlParams[decode(match[1])])) {
                urlParams[decode(match[1])] = [urlParams[decode(match[1])]];
            }
            urlParams[decode(match[1])].push(decode(match[2]));
        } else {
            urlParams[decode(match[1])] = decode(match[2]);
        }
    }
    data = getUserData();
})();

function getUserData() {
    const dataLists = {
        dominik: [
            {name: 'kroki (1000)', bonus: 1000},
            {name: 'kółko AB', bonus: 50},
            {name: 'pompki', bonus: 40},
            {name: 'drążek z taśmą', bonus: 50},
            {name: 'drążek', bonus: 80},
            {name: 'ciężarki (seria 24x2)', bonus: 400},
            {name: '10 przysiadów', bonus: 150},
            {name: '30 przysiadów', bonus: 500},
            {name: 'deska (30 sec)', bonus: 200},
            {name: 'deska (1 min)', bonus: 500},
            {name: 'schody (10 pięter)', bonus: 600},
            {name: 'bieganie (km)', bonus: 1000},
            {name: 'rower (km)', bonus: 500},
            {name: 'workout', bonus: 4000},
            {name: 'inne ekstra', bonus: 1},
        ],
        jacek: [
            {name: 'kroki (1000)', bonus: 625},
            {name: 'trampolina (1 min)', bonus: 50},
            {name: '10 przysiadów', bonus: 150},
            {name: '30 przysiadów', bonus: 500},
            {name: 'bieganie (km)', bonus: 2000},
        ]
    };
    defaultUser = 'dominik'


    if (urlParams.user === undefined) {
        return dataLists[defaultUser];
    }

    if (dataLists[urlParams['user'].toLowerCase()] === undefined) {
        return dataLists[defaultUser];
    }

    return dataLists[urlParams['user'].toLowerCase()];

}

function get_int(id) {
    if (document.getElementById(id).value === undefined) {
        return parseInt(document.getElementById(id).innerHTML)
    } else {
        return parseInt(document.getElementById(id).value);
    }
}

function refresh_total() {
    let bonus_id_name = 0;
    let count_id_name = 0;
    let total_count = 0;

    for (let i=1; i <= data.length; i++) {
        bonus_id_name = 'ex_'+i+'_bonus';
        count_id_name = 'ex_'+i+'_count';
        total_count += get_int(bonus_id_name) * get_int(count_id_name);
    }
    document.getElementById('total_points').innerHTML = total_count.toLocaleString('pl-PL');
}

function bump(id) {
    document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;
    refresh_total();
}

function today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

// Source / inspired by: https://www.blustemy.io/using-the-html-template-element/
document.addEventListener("DOMContentLoaded", () => {
    const template = document.getElementById("excercise-template");
    const ul = document.querySelector("#cards-group");

    for (let i in data) {
        j = parseInt(i)+1;
        const instance = document.importNode(template.content, true);

        instance.getElementById("ex_name").textContent = data[i].name;
        instance.getElementById("ex_name").id = "ex_"+j+"_name";
        instance.getElementById("ex_bonus").textContent = data[i].bonus;
        instance.getElementById("ex_bonus").id = "ex_"+j+"_bonus";

        instance.getElementById("ex_count").id = "ex_"+j+"_count";
        console.log(instance);
        ul.appendChild(instance);
    }
});

window.onbeforeunload = function() {
    //return confirm("Confirm refresh");
};