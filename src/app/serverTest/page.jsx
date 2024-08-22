import { addPost } from '@/lib/actions'

const ServerTest=() =>
{
        return (
                <div>
                        <form action={ addPost }>
                                <input type="text" placeholder="Title " name="title" />
                                <input type="text" placeholder="DEsc " name="desc" />
                                <input type="text" placeholder="slug " name="slug" />
                                <input type="text" placeholder="userId " name="userid" />

                                <button type='submit' >Create </button>
                        </form>
                </div>
        )
}

export default ServerTest
