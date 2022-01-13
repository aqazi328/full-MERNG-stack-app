import {render, screen} from '@testing-library/react';
import Title from '../components/Title';

test('render Login page component', ()=>{
    const title = 'test title';
    render(<Title title={title}/>);
    const title_id = screen.getByTestId('id_1');
    expect(title_id).toBeInTheDocument();
    expect(title_id).toHaveTextContent(title);
});