import { screen,render } from "@testing-library/react";
import Home from "./Home";
4

test("Title Test",()=>{
    render(<Home/>);
    let title=screen.getByTestId("title");
    expect(title).toHaveTextContent("Customer login");

})

test("Link Test",()=>{
    render(<Home/>);
    let link =screen.getByText(/Login/);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href","/home")
})