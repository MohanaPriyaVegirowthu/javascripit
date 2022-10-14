//  const square = function (x) {
    //     return x * x
    // }
    
    // const square = (x) => {
    //     return x * x
    // }
    
    // const square = (x) => x * x
    
    // console.log(square(2))
    
    const Event = {
        name: 'Birthday Party',
        guestList: ['Andrew', 'Jen', 'Mike'],
        printGuestList() {
            console.log('Guest list for ' + this.name)
            
            this.guestList.forEach((guest) => {
                console.log(guest + ' is attending ' + this.name)
            })
        }
    }
    
    Event.printGuestList()