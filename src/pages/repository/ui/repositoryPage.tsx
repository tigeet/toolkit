import { useAppDispatch, useAppSelector } from "@shared/model/hooks";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRepositoryThunk, reset } from "../model/slice";
import { selectRepositoryInfo } from "../model/selector";
import { cn } from "@bem-react/classname";

import { Stars } from "@shared/ui/stars/stars";
import { UpdatedAt } from "@shared/ui/updatedAt/updatedAt";
import UserIcon from "@shared/assets/user.svg?react";

const cl = cn("repositoryPage");
import "./repositoryPage.scss";
import { LANGAUGES_LIMIT } from "../const";
import { Dot } from "@shared/ui/dot/dot";

const RepositoryPage = () => {
  const { login, name } = useParams();
  const dispatch = useAppDispatch();
  const {
    description,
    ownerUrl,
    avatarUrl,
    stars,
    updatedAt,
    languages,
    totalLanguages,
  } = useAppSelector(selectRepositoryInfo);

  useEffect(() => {
    if (!login || !name) return;
    dispatch(fetchRepositoryThunk({ owner: login, name }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, login, name]);

  return (
    <div className={cl()}>
      <div className={cl("repoInfo")}>
        <h1 className={cl("name")}>{name}</h1>

        <div className={cl("repoStats")}>
          <Stars count={stars} />
          <Dot />
          <UpdatedAt date={updatedAt} />
        </div>
      </div>

      <div className={cl("ownerInfo")}>
        <div className={cl("avatar")}>
          {avatarUrl ? (
            <img
              className={cl("avatarImage")}
              src={avatarUrl}
              alt={`${login} profile picture`}
            />
          ) : (
            <UserIcon className={cl("avatarIcon")} />
          )}
        </div>

        <Link to={ownerUrl} target="_blank">
          <span className={cl("owner")}>{login}</span>
        </Link>
      </div>

      <div className={cl("main")}>
        <div className={cl("description")}>
          <h2 className={cl("descriptionTitle")}>About</h2>
          {description ? (
            <span className={cl("descriptionContent")}>{description}</span>
          ) : (
            <span className={cl("descriptionEmpty")}>
              No description provided
            </span>
          )}
        </div>

        <div className={cl("languages")}>
          <h2 className={cl("languagesTitle")}>Languages</h2>
          <div className={cl("languagesList")}>
            {languages.map((language) => (
              <span className={cl("language")} key={language}>
                {language}
              </span>
            ))}

            {totalLanguages > LANGAUGES_LIMIT && (
              <span className={cl("extraLanguages")}>Other</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { RepositoryPage };
