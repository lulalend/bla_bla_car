import {Button, Result} from 'antd';
import {useNavigate} from 'react-router-dom';

export const NoMatch = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Такой страницы не существует :("
                extra={
                <Button
                    type="primary"
                    onClick={() => navigate('/')}
                    style={{ background: "#393939"}}
                >
                    На главную
                </Button>}
            />
        </div>
    );
}