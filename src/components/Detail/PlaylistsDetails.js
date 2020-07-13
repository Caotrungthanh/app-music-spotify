import React from 'react';
import {useParams} from 'react-router-dom';

const PlaylistsDetails = () => {
    let {id} = useParams();

    return (
        <div>
            <span>{id} Đây là trang chi tiết các bài hát playlists của 1 danh mục</span>
        </div>
    )
}
export default PlaylistsDetails;