var makeArr = $('#makeArr')
var lfc = $('#lfc')
var body = $('body')


lfc.on("mouseover", function(){
  body.css("background-color", "#E7A977")
  body.css("transition", ".3s")
})

lfc.on("mouseout", function(){
  body.css("background-color", "#1E555C")
  body.css("transition", ".3s")
})



function createArray(){

  var lang=$('select').val()
  var arrName=$('#arrName').val().trim()
  var listItems=$('#items').val()
  var az = $('#az:checked').val()
  var br = $('#breaks:checked').val()
  var result
  var resultBox = $('#resultBox')
  var resultHere =$('#resultHere')
  arrName= arrName.replaceAll(" ", "")
  var randomize = $('#randomize').val()
  var dataType = $('#dataType:checked').val()

  var array = listItems.replace(/,\s*$/, "").replaceAll(",,,",",").replaceAll(",,",",")
  array= array.split(',').map(item => item.trim())
  var count= array.length

  if (count==1){
    array = listItems.replaceAll(" ", ",")
    array = array.replace(/,\s*$/, "").replaceAll(",,,",",").replaceAll(",,",",")
    array= array.split(',').map(item => item.trim())
    var count= array.length
}

if(az == 'on'){
  array = array.sort()
}

var spacewords = []

for (var i = 0; i < array.length; i++) {

if (array[i].includes(" ")){
    spacewords.push(array[i])
}}

words = spacewords.toString().replaceAll(" ", "<sub>^</sub>").replace(",", "<br>")

if (dataType == 'string'){
  array = array.map(item => `"${item}"`)
}
else{
  for (var i = 0; i < array.length; i++) {

  if (array[i].includes(" ")){
        dataType = 'string'
        array = array.map(item => `"${item}"`)
        break
      }

  else if (isNaN(array[i]) == false) {
    dataType="int"
  }
      else{
        dataType=""
      break
    }}}

if( br == 'on'){
  array = array.map(item => `<br>&nbsp;&nbsp;${item}`)
  var addBr = "<br>"
}
else{
var addBr = ""
}

if (arrName != ""){
  var nameGiven = arrName
}

else{
  var nameGiven = "x"
}

if (lang == 'c'){
result = `${dataType} ${nameGiven}[${count}] = {${array}${addBr}};`
}

else if (lang == 'java'){
result = `${nameGiven} = new ${dataType}[${count}] = {${array}${addBr}}`
}

else if (lang == 'js'){
result = `var ${nameGiven} = [${array}${addBr}]`
}

else if (lang == 'python'){
result = `${nameGiven} = [${array}${addBr}]`
}

if(spacewords.length>0 && $('#dataType:checked').val()!="string"){
  if(spacewords.length==1){
    var num = "a space was"
  }
  else{
    var num = "spaces were"
  }
result = `// Note: Your items became strings because ${num} found: <br><br> ${words} <br><br> ${result} `
}

resultBox.css("display", "block")
resultHere.empty()
resultHere.append(result)

 jQuery('html,body').animate({scrollTop: jQuery('#resultBox').offset().top}, 1000);

}

makeArr.on('click', createArray)
