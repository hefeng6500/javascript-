// lesson one about object and class

// 这么写会导致创建了一个全局变量，如果很多这样的变量，全局污染严重，如果后面覆盖前面的变量，将会导致前面定义的函数无效
function checkName(){
	
}

// 或者

var checkName = function(){
	
}

// 可以采用对象收编上述函数
var CheckObj = {
	checkName: function(){
		
	},
	checkEmail: function(){
		
	},
	checkPassword: function(){
		
	}
}

// 也可以
var CheckObj = function(){}
CheckObj.checkName = function(){}
CheckObj.checkEmail = function(){}
CheckObj.checkPassword = function(){}

// 但是这么写 CheckObj 不能复制, 通过 new 关键词不能复制一个对象达到重用的目的，所以，用下面的方法，

var CheckObj = function(){
	return {
		checkName: function(){
			
		},
		checkEmail: function(){
			
		},
		checkPassword: function(){
			
		}
	}
}
var a = CheckObj()
a.checkName()

// 如上虽然创建了一个可复制的对象，但是并不是真正意义上的类，如下我们创建可以可通过new 关键词复制的一个类，也就是构造函数
var CheckObj = function(){
	this.checkName = function(){}
	this.checkEmail = function(){}
	this.checkPassword = function(){}
}
// 新创建的对象会对类的this上的属性进行复制
var a = new CheckObj()
a.checkName()

// 上述做法还可以优化,有时候都写在构造函数内部消耗会比较大,可以写在prototype对象里面
var CheckObj = function(){}
CheckObj.prototype = {
	checkName: function(){
		
	},
	checkEmail: function(){
		
	},
	checkPassword: function(){

	}
}
var a = new CheckObj()
a.checkName()
a.checkEmail()
a.checkPassword()

// 如上,调用方法调用了三次,我们其实可以对a进行链式调用,像这样 a.checkName().checkEmail().checkPassword()
var CheckObj = function(){}
CheckObj.prototype = {
	checkName: function(){
		console.log("checkName complete! ")
		return this
	},
	checkEmail: function(){
		console.log("checkEmail complete! ")
		return this
	},
	checkPassword: function(){
		console.log("checkPassword complete! ")
		return this
	}
}

var a = new CheckObj()
a.checkName().checkEmail().checkPassword()
// 还记得 jQuery中的api吗? 很多都是可以链式调用,上一个函数肯定return this

// 如果想给每个函数都添加一个方法,可以在Function的原型对象上面添加一个方法,但是下面这种方式是不允许的,因为污染了全局对象
Function.prototype.checkName = function(){}

// 我们可以抽象出一个统一添加的方法
Function.prototype.addMethod = function(name,fn){
	this[name] = fn
}

var method = function(){}
method.addMethod("checkName",function(){
	return this
})
method.addMethod("checkEmail",function(){
	return this
})
method.addMethod("checkPassword",function(){
	return this
})

// l链式添加
Function.prototype.addMethod = function(name,fn){
	this[name] = fn
	return this
}
var methods = function(){}
methods.addMethod("checkName",function(){
	console.log("checkName")
})addMethod("checkEmail",function(){
	console.log("checkEmail")
})
addMethod("checkPassword",function(){
	console.log("checkPassword")
})
methods.checkName()

// 我们再将上述在原型添加方法修改下, 采用类的方式调用
Function.prototype.addMethod = function(name,fn){
	this.prototype[name] = fn
	return this
}
var Methods = function(){}
Methods.addMethod("checkName",function(){
	console.log("checkName complete!")
	return this
}).addMethod("checkEmail",function(){
	console.log("checkEmail complete!")
	return this
})
.addMethod("checkPassword",function(){
	console.log("checkPassword complete!")
	return this
})

var method = new Methods()
console.log(method.prototype)
method.checkName().checkEmail().checkPassword()

// 记住在Function原型里面的return this为的是Methods.addMethod可以链式添加,
// 在addMethod的回调函数里面 return this 指的是,可以让method可以链式调用