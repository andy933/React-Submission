import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render title and author', () => {
    const blog = {
        title: 'Granblue Fantasy',
        author: 'cygames'
    }

    const userInfo = {
        blogs: [],
        id: "999",
        name: 'the latest',
        username: 'new',
        password: 'new',
    }

    render(<Blog blog={blog} user={userInfo} />)

    const renderTitle = screen.getByText('Granblue Fantasy')
    const renderAuthor = screen.getByText('cygames', {exact: false})

    screen.debug(renderTitle)
    screen.debug(renderAuthor)

    expect(renderTitle).toBeDefined()
    expect(renderAuthor).toBeDefined()
})

test('Url and likes are shown when the view button is clicked', async () => {
    const blog = {
        title: 'Granblue Fantasy',
        author: 'cygames',
        url: 'gbf.com',
        likes: 100
    }

    const userInfo = {
        blogs: [],
        id: "999",
        name: 'the latest',
        username: 'new',
        password: 'new',
    }

    const container = render(
        <Blog blog={blog} user={userInfo} />
    ).container

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.details')
    expect(div).not.toHaveStyle('display: none')
})

test('the event handler the component received as props is called twice', async () => {
    const blog = {
        title: 'Gundam Seed',
        author: 'kira',
        url: 'seed.com',
        likes: 0,
        id: "998",
        user: "999"
    }

    const userInfo = {
        blogs: [],
        id: "999",
        name: 'the latest',
        username: 'new',
        password: 'new',
    }

    const updateLike = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} user={userInfo} updateLike={updateLike} />)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateLike.mock.calls).toHaveLength(2)
    console.log(updateLike.mock.calls)
    expect(updateLike.mock.calls[0][0].likes + updateLike.mock.calls[1][0].likes).toBe(2)
})
