import { useAppDispatch, useAppSelector } from "@shared/model/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRepositoryThunk, reset } from "../model/slice";
import {
  selectError,
  selectLoading,
  selectRepositoryInfo,
} from "../model/selector";
import { cn } from "@bem-react/classname";
import { LANGAUGES_LIMIT } from "../const";
import { Dot, Link, UpdatedAt, Stars } from "@shared/ui/";
import { Skeleton } from "@shared/ui/skeleton/skeleton";

const cl = cn("repositoryPage");
import "./repositoryPage.scss";

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
  const error = useAppSelector(selectError);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    if (!login || !name) return;
    dispatch(fetchRepositoryThunk({ owner: login, name }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, login, name]);

  if (error) {
    return (
      <main className={cl({ hasError: Boolean(error) })}>
        <div className={cl("error")}>
          <img
            className={cl("errorImage")}
            src="/sad-emoji-2.png"
            alt="sad emoji"
          />
          <span className={cl("errorMessage")}>{error.message}</span>
          <Link to="/" className={cl("errorLink")}>
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className={cl()}>
      <div className={cl("repoInfo")}>
        {loading ? (
          <Skeleton height={30} width={120} />
        ) : (
          <h1 className={cl("name")} data-testid="repositoryPage__name">
            {name}
          </h1>
        )}

        <div className={cl("repoStats")}>
          {loading ? (
            <Skeleton height={16} width={60} />
          ) : (
            <Stars count={stars} />
          )}
          <Dot />

          <UpdatedAt date={updatedAt} loading={loading} />
        </div>
      </div>

      <div className={cl("ownerInfo")}>
        <div className={cl("avatar")}>
          {loading ? (
            <Skeleton height={24} width={24} variant="circular" />
          ) : (
            <img
              className={cl("avatarImage")}
              src={avatarUrl}
              alt={`${login} profile picture`}
            />
          )}
        </div>

        {loading ? (
          <Skeleton height={20} width={120} />
        ) : (
          <Link
            to={ownerUrl}
            target="_blank"
            data-testid="repositoryPage__login"
          >
            <span className={cl("owner")}>{login}</span>
          </Link>
        )}
      </div>

      <div className={cl("main")}>
        <div className={cl("description")}>
          <h2 className={cl("descriptionTitle")}>About</h2>
          {description ? (
            loading ? (
              <Skeleton width="100%" height={50} />
            ) : (
              <span
                className={cl("descriptionContent")}
                data-testid="repositoryPage__description"
              >
                {description}
              </span>
            )
          ) : (
            <span
              className={cl("descriptionEmpty")}
              data-testid="repositoryPage__description-empty"
            >
              No description provided
            </span>
          )}
        </div>

        <div className={cl("languages")}>
          <h2 className={cl("languagesTitle")}>Languages</h2>
          <div className={cl("languagesList")}>
            {loading ? (
              <>
                <Skeleton height={14} width={60} />
                <Skeleton height={14} width={120} />
                <Skeleton height={14} width={90} />
              </>
            ) : (
              <>
                {languages.map((language) => (
                  <span className={cl("language")} key={language}>
                    {language}
                  </span>
                ))}

                {totalLanguages > LANGAUGES_LIMIT && (
                  <span className={cl("extraLanguages")}>Other</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export { RepositoryPage };
