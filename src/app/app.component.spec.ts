import { AppComponent } from "./app.component"

describe('AppComponent',()=>{
    let component: AppComponent

    beforeEach(()=>{
        component = new AppComponent()
    })

    it('should have correct title',()=> {
        expect(component.title).toEqual('angular-testing-project')
    })
})