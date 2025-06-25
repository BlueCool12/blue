

const Test = () => {

    return (
        <>
            {/* <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <div style={{ marginBottom: '1rem', padding: '0.3rem 1rem', backgroundColor: '#328AA3', color: '#fff', fontWeight: '800' }}>VALUE</div>

                <div style={{ display: 'flex', fontSize: '1.2rem', fontWeight: '600', color: '#145B6F' }}>
                    <div style={{ border: '2px solid #6DBEDC', padding: '1rem 1.5rem' }}>
                        10
                    </div>
                    <div style={{ border: '2px solid #6DBEDC', borderInlineStart: 'none', padding: '1rem 1.5rem' }}>
                        20
                    </div>
                    <div style={{ border: '2px solid #6DBEDC', borderInlineStart: 'none', padding: '1rem 1.5rem' }}>
                        30
                    </div>
                    <div style={{ border: '2px solid #6DBEDC', borderInlineStart: 'none', padding: '1rem 1.5rem' }}>
                        40
                    </div>
                    <div style={{ border: '2px solid #6DBEDC', borderInlineStart: 'none', padding: '1rem 1.5rem' }}>
                        50
                    </div>
                </div>

                <div style={{ display: 'flex', fontSize: '1.2rem', fontWeight: '600', color: '#145B6F' }}>
                    <div style={{ padding: '0.5rem 1.9rem' }}>
                        0
                    </div>
                    <div style={{ padding: '0.5rem 1.9rem' }}>
                        1
                    </div>
                    <div style={{ padding: '0.5rem 1.9rem' }}>
                        2
                    </div>
                    <div style={{ padding: '0.5rem 1.9rem' }}>
                        3
                    </div>
                    <div style={{ padding: '0.5rem 1.9rem' }}>
                        4
                    </div>
                </div>

                <div style={{ marginBottom: '1rem', padding: '0.3rem 1rem', backgroundColor: '#328AA3', color: '#fff', fontWeight: '800' }}>INDEX</div>
            </div> */}


            <div style={{ padding: '2rem', display: 'flex' }}>
                <div style={{ display: 'flex', border: '1px solid #6DBEDC', color: '#145B6F' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ borderBottom: '1px solid #6DBEDC', padding: '0.5rem 3rem', fontWeight: '800' }}>
                            연산 종류
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem' }}>
                            접근
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem' }}>
                            탐색
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem' }}>
                            삽입
                        </div>
                        <div style={{ padding: '0.5rem' }}>
                            삭제
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ borderBottom: '1px solid #6DBEDC', padding: '0.5rem 3rem', fontWeight: '800' }}>
                            시간 복잡도
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem' }}>
                            O(1)
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem' }}>
                            O(n)
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem' }}>
                            O(n)
                        </div>
                        <div style={{ padding: '0.5rem' }}>
                            O(n)
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ borderBottom: '1px solid #6DBEDC', padding: '0.5rem 2rem 0.5rem 1rem', fontWeight: '800' }}>
                            설명
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem 2rem 0.5rem 1rem' }}>
                            인덱스로 바로 접근
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem 2rem 0.5rem 1rem' }}>
                            원하는 값을 찾기위해 처음부터 끝까지 탐색
                        </div>
                        <div style={{ borderBottom: '1px solid #BEE9F4', padding: '0.5rem 2rem 0.5rem 1rem' }}>
                            중간 삽입 시 요소 이동 필요
                        </div>
                        <div style={{ padding: '0.5rem 2rem 0.5rem 1rem' }}>
                            중간 삭제 시 요소 이동 필요
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Test;