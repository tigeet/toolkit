import { memo } from "react";
import { cn } from "@bem-react/classname";
import { Link } from "react-router-dom";
import { formatDate } from "@shared/utils";

import StarIcon from "@shared/assets/star.svg?react";
import GithubIcon from "@shared/assets/github.svg?react";
import "./repository.scss";
import { Dot } from "@shared/ui/dot/dot";

const cl = cn("repository");

type Props = {
  name: string;
  stars: number;
  updatedAt: Date;
  owner: string;
  url: string;
};

export const Repository = memo(
  ({ name, stars, owner, updatedAt, url }: Props) => {
    return (
      <div className={cl()}>
        <div className={cl("info")}>
          <Link to={`/${owner}/${name}`}>
            <h3 className={cl("title")}>{name}</h3>
          </Link>
          <ul className={cl("stats")}>
            <li className={cl("updatedAt")}>
              Updated at {formatDate(updatedAt)}
            </li>
            <Dot />
            <li className={cl("stars")}>
              <StarIcon className={cl("starsIcon")} />
              <span className={cl("starsCount")}>{stars}</span>
            </li>
          </ul>
        </div>

        <div>
          <Link className={cl("githubLink")} to={url}>
            <GithubIcon className={cl("githubIcon")} />
          </Link>
        </div>
      </div>
    );
  }
);
