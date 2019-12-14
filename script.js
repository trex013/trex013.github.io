var getId = function(x){
	return document.querySelector(x);
};

var print_obj = function(obj){
	var y = "";
	for (x in obj){
		y += x + "--" + obj[x] + "<br>";
	}
	getId("#error-test").innerHTML = y;

};

// Ui class
function Ui(){
	
	var tags = {
		
		"out" : {
			
			"total": getId("span#total"),
		
			"percent":getId("span#percent"),
			
			"bgt": getId("#bgt"),
			
			"exp": getId("#exp"),
			
			"bgtList": getId(".data-1 ol"),
			
			"expList": getId(".data-2 ol")
		},
		
		"inp": {
			
			"type":getId("#bgt-type"),
			
			"title": getId("#bgt-title"),
			
			"amt":getId("#bgt-amt")
		}
	};
	
	this.clearAll = function(){
		
		tags.out.bgtList.innerHTML = "";
		
		tags.out.expList.innerHTML = "";
		
		tags.out.total.innerHTML = "Enter Your Income & Expenses";
		
		tags.out.percent.innerHTML = "";
		
	};
	
	this.getBudgetEntry = function(){
		
		var data = [
		
				tags.inp.type.value, 
				
				tags.inp.title.value,
				
				tags.inp.amt.value
				
		];
		
		return data;
	};
	
	this.deleteEntry = function(entry){
		
		entry.parentNode.removeChild(entry);
		
	};
	
	this.present= function(d , typ, paste){
		
		var data = "";
		
		for (var i = 0; i < d.length; i ++){
	
			data += "<li id = '" + typ +"-"+ i + "'>" +d[i][0]+
							"<span id='amt'> $"+d[i][1]+
							" </span><i class='delete'>×</i></li>";
			
		}
		
		paste.innerHTML = data;
		
	};
	
	this.update= function(d){
		
		this.present(d.bgt,"bgt", tags.out.bgt);
		
		this.present(d.exp,"exp", tags.out.exp);
		
		tags.out.total.innerHTML = "$ "+d.diff + " left";
		
		tags.out.percent.innerHTML = d.percentage.toFixed(0) +
										 "% used of $"+ d.totalBgt.toFixed(2);
										
		// Clear input tags
		tags.inp.title.value="";
		
		tags.inp.amt.value="";
		
	};
	
}
// End of Ui class

// Model classl

function Model(){
	
	var data = {
		
					"exp":[], 
					
					"bgt":[],
					
					"totalExp":0,
					
					"totalBgt":0,
					
					"diff":0,
					
					"percentage":0
	};
	
	this.clearAll = function(){
		
		data = {
		
					"exp":[], 
					
					"bgt":[],
					
					"totalExp":0,
					
					"totalBgt":0,
					
					"diff":0,
					
					"percentage":0
		};
		
	};
	
	this.calc = function(){
		
		data.totalExp = this.sum(data.exp);
		
		data.totalBgt = this.sum(data.bgt);
		
		data.diff = data.totalBgt - data.totalExp;
		
		if (data.totalBgt > 0){
			
			data.percentage = (data.totalExp/data.totalBgt) * 100;
			
		} else {
			
			data.percentage = 0;
			
		}
	};
	
	this.sum = function(arr){
		
		var sum = 0;
		
		for (var i = 0; i<arr.length; i ++){
			
			sum += parseInt(arr[i][1]);
			
		}
		
		return sum;
	};
	
	this.getEntry = function(d){
		
		if (d[0] == "+"){
			
			data["bgt"].push([d[1],d[2]]);
			
		}
		
		if (d[0] == "-"){
			
			data["exp"].push([d[1],d[2]]);
		}
	
		this.calc();
		
		return data;
	};
	
	this.deleteEntry = function (entry){
		
		data[entry[0]].pop(parseInt(entry[1]));
		
		//print_obj(data);
		this.calc();
		
		return data;
	};
	
}
// End of Model class

// Controller Class
function Controller(U,M){
	
	var Ui = new U();
	
	var Model = new M();
	
	var eTag = {
		
		"clearAll": getId("a#clear"),
		
		"save":getId("a#save"),
		
		"logout": getId("#logout"),
		
		"enterData": getId("#bgt-btn"),
		
		"bgtList": getId(".data-1 ol"),
			
		"expList": getId(".data-2 ol")
		
	};
	
	var delFunc = function(e){
		
		toDelete = e.srcElement.parentNode;
			
			if (toDelete.nodeName == "LI" && 
				e.srcElement.nodeName == "I"){
				
				entryDelId = toDelete.id;
				
				entry = entryDelId.split("-");alert(entry);
				
				Ui.deleteEntry(toDelete);
			
				data = Model.deleteEntry(entry);

				Ui.update(data);
			}
			
	};
	
	this.requestHandler = function(){
		
		eTag.clearAll.addEventListener("click", function(){
			
			Ui.clearAll();
			
			Model.clearAll();
			
		});
		
		eTag.save.addEventListener("click", function(){
			
			if (Model.save() == true){
				
				Ui.alert("Data Saved");
				
			}
			
		});
		
		// checks for click event on the button
		eTag.enterData.addEventListener("click", function(){
			 // gets data 
			data = Ui.getBudgetEntry();
			
			// adds data
			if (data[2] == "" || !parseInt(data[2])){
				
				alert("Wrong Data entry");
				
				this.requestHandler();
				
			}
			
			data = Model.getEntry(data);
			
			// update data
			Ui.update(data); 
			
		});
		
		
		// for delete option
		//var toDelete, entryDelId, entry;
		
		eTag.bgtList.addEventListener("click", function (e){
			
			delFunc(e);
			
		});
		
		eTag.expList.addEventListener("click", function (e){
			
			delFunc(e);
			
		});

	};
	
	this.requestHandler();
}
// End of controller class

//App run

(function (){
	var x = new Controller(Ui, Model);
})();