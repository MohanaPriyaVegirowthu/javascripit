const posts = [{
    title:'post one',
    body:'this is post one'
},{
    title:'post two',
    body:'this is post two'
}]


function getPosts() {
    setTimeout(() =>{
        let output = ''
        posts.forEach((post)=>{
            output += `<li>${post.title}</li>`
        })
        document.body.innerHTML = output
    },1000)
}
function createPost(post){
    return new Promise((resolve,reject)=> {
       setTimeout(()=>{
        posts.push(post)
        const error = false;
        if(!error){
            resolve()
        }else{
            reject('error')
        }
       },2000)
    }
)}
createPost({title:'post three',body:'this is post three'}).then(getPosts).catch(err=>console.log(err))