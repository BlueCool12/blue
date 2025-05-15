import { useNavigate } from "react-router-dom";

import { postApi } from "../../../api/admin/postApi";
import { Post, PostForm } from "../../../components/admin/PostForm";

const Write = () => {

    const navigate = useNavigate();

    const handleCreate = async (post: Post) => {
        try {
            const result = await postApi.createPost(post);
            console.log("등록 성공", result);
            navigate('/admin');
            // 성공 후 로직
        } catch (error) {
            console.error("등록 실패", error);
            // 실패 후 로직
        }
    };

    return (
        <PostForm mode="create" onSubmit={handleCreate} />
    );
};

export default Write;
