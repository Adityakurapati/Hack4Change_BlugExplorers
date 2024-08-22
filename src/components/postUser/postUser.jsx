import styles from './postUser.module.css'; // Ensure the CSS module file exists
import { getUser } from '@lib/data';

const PostUser=async ( { userId } ) =>
{
        const user=await getUser( { id: userId } );

        if ( !user )
        {
                return <div>User not found</div>;
        }

        return (
                <div className={ styles.detailedText }>
                        <span className={ styles.detailTitle }>Author</span>
                        <span className={ styles.detailValue }>{ user.username }</span>
                </div>
        );
}

export default PostUser;
