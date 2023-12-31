import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "./admin.css";
const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className="card-skeleton">
        <div className="left-col">
          <Skeleton
            circle={true}
            height={100}
            width={100}
            className="skeleton"
          />
        </div>
        <div className="right-col">
          <span className="username">
            <Skeleton className="skeleton" />
          </span>
          <span>
            <Skeleton className="skeleton" />
            <Skeleton className="skeleton" />
          </span>
          <span>
            {" "}
            <Skeleton className="skeleton" />
          </span>
          <span>
            {" "}
            <Skeleton className="skeleton" />
          </span>
          <span>
            <Skeleton className="skeleton" />
          </span>
          <span>
            {" "}
            <Skeleton className="skeleton" />
          </span>
          <span>
            {" "}
            <Skeleton className="skeleton" />
          </span>
          <span>
            <Skeleton width={150} className="skeleton" />{" "}
            <Skeleton width={150} className="skeleton" />
          </span>
          <span>
            <button>
              <Skeleton width={50} className="skeleton" />
            </button>
          </span>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton;
