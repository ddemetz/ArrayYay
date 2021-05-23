var btn= $('#btn')
var results = $('.results')
var ia = $('.ia')
var totalph = $('.totalph')
var resultBox = $('#resultBox')
var arrayYay = $('#arrayyay')
var body = $("body")

arrayYay.on("mouseover", function(){
  body.css("background-color", "#1E555C")
  body.css("transition", ".3s")
})

arrayYay.on("mouseout", function(){
  body.css("background-color", "#E7A977")
  body.css("transition", ".3s")
})


btn.on("click", function(){

var amount = Number($('#amount').val())
var original = Number($('#amount').val())
original = Number(original.toFixed(2))
var percent = Number($('#percent').val())/100
var months = Number($('#months').val())
var fee
var fees=[]
var visuals=[]
var nums = []


for (var i = 0; i < months; i++) {
  fee = Number((amount*percent).toFixed(2))
  total = amount + fee
  amount = total
  fees.push(fee)
}

console.log("total:" + total)

function change(changeVal){

  changeVal = `${changeVal}`
  var cents = changeVal.split(".")
// console.log(cents[1].length)
  if(cents.length == 2){

    if(cents[1].length == 2){
      nums.push(changeVal)

    }
    else if(cents[1].length == 1){
      changeVal += "0"
      nums.push(changeVal)
    }

  }
  else{
    changeVal += ".00"
    nums.push(changeVal)
  }


}

change(original)

for (var val in fees) {
  change(fees[val])
}


resultBox.css("display", "block")

ia.html(`Original Invoice Amount:<span style="float:right;">$${nums[0]}`)

for (var counter = 0; counter < fees.length; counter++) {
  visuals.push(`Month ${counter+1} Fee: <span style="float:right;">$${nums[counter+1]}</span><br>`)
}


var sum = fees.reduce(function(a, b){
        return a + b;
    }, 0)

results.html(visuals)


total = sum + original


total = Math.ceil(total * 100) / 100;

change(total)
console.log(nums)

totalph.html(`Total:<span style="float:right;">$${nums[nums.length-1]}`)
console.log(nums[nums.length-1])



})
