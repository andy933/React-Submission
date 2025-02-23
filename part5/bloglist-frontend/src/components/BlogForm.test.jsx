import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogFrom'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const login = {
        username: 'new',
        password: 'new',
        id: 999
    }

    const userInfo = {
        username: 'new',
        password: 'new',
    }

    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} login={[login]} user={userInfo} />)

    const input = screen.getAllByRole('textbox')
    const button = screen.getByText('create')
    await user.type(input[0], 'Resident Evil')
    await user.type(input[1], 'Leon S Kennedy')
    await user.type(input[2], 'residentEvil.com')

    await user.click(button)
    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].user).toBe(999)
    expect(createBlog.mock.calls[0][0].title).toBe('Resident Evil')
    expect(createBlog.mock.calls[0][0].author).toBe('Leon S Kennedy')
    expect(createBlog.mock.calls[0][0].url).toBe('residentEvil.com')
    expect(createBlog.mock.calls[0][0].likes).toBe(0)
})