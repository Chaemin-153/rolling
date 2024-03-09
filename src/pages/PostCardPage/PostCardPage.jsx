import Input from '../../components/Input/Input';
import Option from '../../components/Option/Option';
import styles from './PostCardPage.module.scss';
import { Button, ButtonToggle } from '../../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUTTON_SIZE, LABEL, DESCRIPTION, TEAM } from '../../constants';
import useMutate from '../../hooks/useMutate';
import ErrorPage from '../ErrorPage/ErrorPage';
import useManageInput from '../../hooks/useManageInput/useManageInput';

export default function PostCardPage() {
  const URL = `/${TEAM}/recipients/`;
  const navigate = useNavigate();
  const [type, setType] = useState('color');
  const { mutate: postCard } = useMutate(URL);
  const {
    handleClick,
    handleChange,
    inputRef,
    inputValue,
    isError,
    isValueExist,
  } = useManageInput();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value || null,
      team: TEAM,
      backgroundColor: e.target.backgroundColor.value || 'beige',
      backgroundImageURL: e.target.backgroundImageURL.value || null,
    };

    postCard(formData, {
      onSuccess: (data) => {
        navigate(`/post/${data.id}`);
      },
      onError: (error) => {
        return <ErrorPage errorMessage={error} />;
      },
    });
  };

  const handleButtonClick = (e) => {
    if (e === 'left') setType('color');
    else setType('image');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.div}>
        <div ref={inputRef}>
          <Input
            placeholder="받는 사람 이름을 입력해 주세요"
            label="To."
            name="name"
            onClick={handleClick}
            onChange={handleChange}
            value={inputValue}
            className={
              isError
                ? styles.error
                : isValueExist
                  ? styles.active
                  : styles.input
            }
          />
          {isError && <p className={styles.errormessage}>필수 항목입니다.</p>}
        </div>
        <div className={styles.textWrapper}>
          <h1 className={styles.h1}>{LABEL}</h1>
          <p className={styles.p}>{DESCRIPTION}</p>
        </div>
        <div className={styles.buttonToggle}>
          <ButtonToggle
            textLeft="컬러"
            textRight="이미지"
            onClick={handleButtonClick}
            type="button"
          />
        </div>
        <Option type={type} />
        <input type="hidden" name="team" value="4-22" />
        <Button type="submit" size={BUTTON_SIZE.xl}>
          생성하기
        </Button>
      </div>
    </form>
  );
}
