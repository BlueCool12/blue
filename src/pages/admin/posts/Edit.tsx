import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post, PostForm } from "../../../components/admin/PostForm";
import { postApi } from "../../../api/admin/postApi";
import { useAppDispatch } from "../../../store/hooks";
import { updatePost } from "../../../store/admin/postSlice";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState<Post | undefined>(undefined);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;

        const getPost = async () => {
            try {
                const result = await postApi.getPost(Number(id));
                setPostData({
                    title: result.title,
                    content: result.content,
                    category: result.category,
                    isPublic: result.isPublic,
                });
            } catch (error) {
                console.error('글 불러오기 실패', error);
            }
        };

        getPost();
    }, [id]);

    const handleUpdate = (post: Post) => {
        if (!id) return;

        dispatch(updatePost({ id: Number(id), payload: post }))
            .unwrap()
            .then(() => {
                navigate('/admin/posts');
            })
            .catch((error) => {
                console.error('수정 실패', error);
            });
    };

    return (
        <PostForm
            mode="edit"
            initialData={postData}
            onSubmit={handleUpdate}
        />
    );
}

export default Edit;